import { useCallback, useEffect, useMemo, useState } from "react";
import { usePrivateQuery } from "../usePrivateQuery";
import { useWebSocketClient } from "../useWebSocketClient";
import { positions } from "@orderly/futures";
import { useObservable } from "rxjs-hooks";
import { map } from "rxjs/operators";

import { type SWRConfiguration } from "swr";
import { createGetter } from "../utils/createGetter";
import { useFundingRates } from "./useFundingRates";
import { type API } from "@orderly/types";

export interface PositionReturn {
  data: any[];
  loading: boolean;
  close: (qty: number) => void;
}

export const usePositionStream = (
  symbol?: string,
  options?: SWRConfiguration
) => {
  // const [data, setData] = useState<Position[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [visibledSymbol, setVisibleSymbol] = useState<string | undefined>(
    symbol
  );

  const fundingRates = useFundingRates();

  const { data, error, isLoading } = usePrivateQuery<API.PositionInfo>(
    `/positions`,
    {
      // revalidateOnFocus: false,
      // revalidateOnReconnect: false,
      ...options,
      formatter: (data) => data,
    }
  );

  const ws = useWebSocketClient();

  // console.log("positions", positions);

  type PositionArray =
    | (API.Position & {
        sum_unitary_funding?: number;
      })[]
    | undefined;

  const value = useObservable<PositionArray, PositionArray[]>(
    (_, input$) =>
      input$.pipe(
        map((data) => {
          return data[0];
        }),
        map((data) => {
          // console.log("obser", data);
          return data?.map((item) => {
            return {
              ...item,
              notional: positions.notional(
                item.position_qty,
                item.average_open_price
              ),
              unrealized_pnl: positions.unrealizedPnL({
                qty: item.position_qty,
                openPrice: item.average_open_price,
                markPrice: item.mark_price,
              }),
            };
          });
        })
      ),
    undefined,
    [data?.rows]
  );

  // 合计数据
  const aggregatedData = useMemo(() => {
    const aggregatedData = {
      unsettledPnL: NaN,
      unrealPnL: NaN,
      notional: NaN,
    };

    if (value && value.length) {
      aggregatedData.unrealPnL = positions.totalUnrealizedPnL(value);
      aggregatedData.notional = positions.totalNotional(value);
      aggregatedData.unsettledPnL = positions.totalUnsettlementPnL(
        value.map((item) => ({
          ...item,
          sum_unitary_funding: fundingRates[item.symbol]?.(
            "sum_unitary_funding",
            0
          ),
        }))
      );
    }

    return aggregatedData;
  }, [value, fundingRates]);

  const showSymbol = useCallback((symbol: string) => {
    setVisibleSymbol(symbol);
  }, []);

  return [
    { rows: value, aggregated: aggregatedData },
    createGetter<Omit<API.PositionInfo, "rows">>(data as any, 1),
    {
      close: (qty: number) => {},
      loading: false,
      showSymbol,
      error,
      loadMore: () => {},
      refresh: () => {},
      // toggleHideOthers,
      // filter: (filter: string) => {},
    },
  ];
};
