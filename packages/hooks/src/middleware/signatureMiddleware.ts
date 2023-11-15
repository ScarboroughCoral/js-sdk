import { SWRHook, Middleware } from "swr";
import { SimpleDI, Account, MessageFactor } from "@orderly.network/core";
import { useConfig } from "../useConfig";

export const signatureMiddleware: Middleware = (useSWRNext: SWRHook) => {
  const apiBaseUrl = useConfig<string>("apiBaseUrl");
  return (key, fetcher, config) => {
    try {
      const extendedFetcher = async (args: any) => {
        let url = Array.isArray(args) ? args[0] : args;

        let account = SimpleDI.get<Account>("account");
        let fullUrl = `${apiBaseUrl}${url}`;

        const signer = account.signer;

        const payload: MessageFactor = {
          method: "GET",
          url,
        };

        const signature = await signer.sign(payload);

        console.log("signature:", fullUrl);

        // @ts-ignore
        return fetcher(fullUrl, {
          headers: {
            ...signature,
            "orderly-account-id": account.accountId,
          },
        });
      };
      return useSWRNext(key, extendedFetcher, config);
    } catch (e) {
      console.error("signature error:", e);
      throw e;
    }
  };
};
