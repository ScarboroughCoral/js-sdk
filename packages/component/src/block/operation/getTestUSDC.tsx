import { X } from "lucide-react";
import { useMutation, useAccount } from "@orderly.network/hooks";
import { useCallback, useEffect, useState } from "react";
import { AccountStatusEnum } from "@orderly.network/types";
import { modal } from "@/modal";
import { toast } from "@/toast";

const localStorageItem = "Orderly_GetTestUSDC";

export const GetTestUSDC = () => {
  const { account, state } = useAccount();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(
      `${localStorageItem}_${state.accountId}`
    );
    console.log("get test usdc", value);
    if (!value) {
      setShow(() => true);
    }
  }, []);

  const [getTestUSDC, { isMutating }] = useMutation(
    "https://testnet-operator-evm.orderly.org/v1/faucet/usdc"
  );

  const onCloseClick = useCallback(() => {
    setShow(false);
    localStorage.setItem(`${localStorageItem}_${state.accountId}`, "1");
  }, []);

  const onGetClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const toastId = toast.loading("Getting test USDC...");
      getTestUSDC({
        chain_id: account.wallet.chainId.toString(),
        user_address: state.address,
        broker_id: "woofi_dex",
      })
        .then(
          (res: any) => {
            if (res.success) {
              return modal.confirm({
                title: "Get test USDC",
                content:
                  "We’re adding 1,000 test USDC to your balance, it will take up to 3 minutes to process. Please check later.",
                onOk: () => {
                  return Promise.resolve();
                },
              });
            } else {
              return Promise.reject(res);
            }
          },
          (error: Error) => {
            toast.error(error.message);
          }
        )
        .finally(() => {
          toast.dismiss(toastId);
        });
    },
    [state]
  );

  if (!show) {
    return null;
  }

  return (
    <div className="flex justify-between items-center fixed left-0 right-0 bottom-[44px] h-[40px] bg-base-300 z-20 px-2 animate-in fade-in ">
      <div className="text-sm text-base-contrast/50 cursor-pointer">
        <span className="text-primary-light" onClick={onGetClick}>
          Get test USDC
        </span>{" "}
        and earn an NFT in our{" "}
        <a
          href="https://galxe.com/orderlynetwork/campaign/GCiLaU2YJm"
          className="text-primary-light"
        >
          testnet campaign
        </a>
        !
      </div>
      {/* Get test USDC and earn an NFT in our testnet campaign! */}
      <div className="p-2">
        <button
          className="w-[16px] h-[16px] rounded-full bg-primary-light flex justify-center items-center"
          onClick={onCloseClick}
        >
          <X size={14} className="text-base-100" />
        </button>
      </div>
    </div>
  );
};
