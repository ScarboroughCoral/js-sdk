import { NetworkId, type API, chainsInfoMap } from "@orderly.network/types";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { OrderlyContext } from "../orderlyContext";
import { useQuery } from "../useQuery";
import { mergeDeepRight, prop } from "ramda";
import { nativeTokenAddress } from "../woo/constants";

type inputOptions = {
  filter?: (item: API.Chain) => boolean;
  pick?: "dexs" | "network_infos" | "token_infos";
  crossEnabled?: boolean;
  wooSwapEnabled?: boolean; // if true, use wooSwap api, else use orderly api only
};

export const useChains = (
  networkId?: NetworkId,
  options: inputOptions & SWRConfiguration = {}
) => {
  const { filter, pick, crossEnabled, wooSwapEnabled, ...swrOptions } = options;
  const { configStore, networkId: envNetworkId } = useContext(OrderlyContext);

  const field = options?.pick;

  const map = useRef(
    new Map<
      number,
      API.Chain & {
        nativeToken?: API.TokenInfo;
      }
    >()
  );

  const { data, error: swapSupportError } = useSWR<any>(
    () =>
      wooSwapEnabled
        ? `${configStore.get("swapSupportApiUrl")}/swap_support`
        : null,
    // `${configStore.get("swapSupportApiUrl")}/swap_support`,
    (url) => fetch(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true, // If false, undefined data gets cached against the key.
      dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr
      ...swrOptions,
    }
  );

  const { data: orderlyChains, error: tokenError } = useQuery<API.Chain[]>(
    "/v1/public/token",
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      dedupingInterval: 3_600_000,
    }
  );

  //

  const chains = useMemo(() => {
    if (!orderlyChains) return undefined;

    let orderlyChainsArr: API.Chain[] = [];
    const orderlyChainIds = new Set<number>();

    orderlyChains.forEach((item) => {
      item.chain_details.forEach((chain: any) => {
        const chainId = Number(chain.chain_id);
        orderlyChainIds.add(chainId);
        const chainInfo = chainsInfoMap.get(chainId);

        const _chain: any = {
          network_infos: {
            name: chain.chain_name ?? chainInfo?.chainName ?? "--",
            // "public_rpc_url": "https://arb1.arbitrum.io/rpc",
            chain_id: chainId,
            withdrawal_fee: chain.withdrawal_fee,

            bridgeless: true,
          },
          token_infos: [
            {
              symbol: item.token,
              address: chain.contract_address,
              decimals: chain.decimals,
            },
          ],
        };

        if (typeof options?.filter === "function") {
          if (!options.filter(_chain)) return;
        }

        map.current.set(chainId, _chain);

        // orderlyChainsArr.push(field ? _chain[field] : _chain);
        orderlyChainsArr.push(_chain);
      });
    });

    if (!wooSwapEnabled) {
      //
      let arr: any[] = orderlyChainsArr;
      if (typeof options?.filter === "function") {
        arr = orderlyChainsArr.filter(options.filter);
      }

      if (!!field) {
        arr = arr.map((item) => item[field]);
      }

      return arr;
    } else {
      //
      if (!data || !data.data) return data;

      let testnetArr: API.Chain[] = [
        //@ts-ignore
        {
          network_infos: {
            name: "Arbitrum Goerli",
            shortName: "Arbitrum Goerli",
            public_rpc_url: "https://goerli-rollup.arbitrum.io/rpc",
            chain_id: 421613,
            currency_symbol: "ETH",
            bridge_enable: true,
            mainnet: false,
            explorer_base_url: "https://goerli.arbiscan.io/",
            est_txn_mins: null,

            woofi_dex_cross_chain_router: "",
            woofi_dex_depositor: "",
          },
        },
      ];
      let mainnetArr: API.Chain[] = [];

      Object.keys(data.data).forEach((key) => {
        // if (orderlyChainIds.has(data.data[key].network_infos.chain_id)) return;

        const chain = data.data[key];

        const item: any = mergeDeepRight(chain, {
          name: key,
          network_infos: {
            bridgeless: orderlyChainIds.has(chain.network_infos.chain_id),
            shortName: key,
          },
          token_infos: chain.token_infos.filter(
            (token: API.TokenInfo) => !!token.swap_enable
          ),
        });

        if (item.token_infos?.length === 0) return;

        map.current.set(item.network_infos.chain_id, item);

        if (typeof options?.filter === "function") {
          if (!options.filter(item)) return;
        }

        if (item.network_infos.mainnet) {
          mainnetArr.push(item);
        } else {
          testnetArr.push(item);
        }
      });

      mainnetArr.sort((a, b) => {
        return a.network_infos.bridgeless ? -1 : 1;
      });

      testnetArr.sort((a, b) => {
        return a.network_infos.bridgeless ? -1 : 1;
      });

      if (!!field) {
        //@ts-ignore
        testnetArr = testnetArr.map((item) => item[field]);
        //@ts-ignore
        mainnetArr = mainnetArr.map((item) => item[field]);
      }

      if (networkId === "mainnet") {
        return mainnetArr;
      }

      if (networkId === "testnet") {
        return testnetArr;
      }

      return {
        testnet: testnetArr,
        mainnet: mainnetArr,
      };
    }
  }, [data, networkId, field, options, orderlyChains, wooSwapEnabled]);

  // const dstToken = useMemo(() => {},[]);

  const findByChainId = useCallback(
    (chainId: number, field?: string) => {
      const chain = map.current.get(chainId);

      if (chain) {
        chain.nativeToken = chain.token_infos?.find(
          (item) => item.address === nativeTokenAddress
        );
      }

      if (typeof field === "string") {
        return prop(field, chain);
      }

      return chain;
    },
    [chains, map.current]
  );

  // const findNativeTokenByChainId = useCallback(
  //   (chainId: number): API.TokenInfo | undefined => {
  //     const chain = findByChainId(chainId);
  //     if (!chain) return;
  //
  //   },
  //   [chains]
  // );

  return [
    chains,
    {
      findByChainId,
      // findNativeTokenByChainId,
      error: swapSupportError || tokenError,
      // nativeToken,
    },
  ];
};
