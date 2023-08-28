import { map } from "rxjs/operators";
import { useWebSocketClient } from "../useWebSocketClient";
import { WSMessage } from "@orderly/types";
import useConstant from "use-constant";

export const useMarkPricesSubject = () => {
  const ws = useWebSocketClient();
  return useConstant(() =>
    ws.observe("markprices").pipe(
      map((data: WSMessage.MarkPrice[]) => {
        const prices: { [key: string]: number } = {};

        data.forEach((item) => {
          prices[item.symbol] = item.price;
        });
        return prices;
      })
    )
  );
};
