import { Avatar, Blockie } from "@/avatar";
import Button, { IconButton } from "@/button";
import { Share, Copy } from "lucide-react";
import React, { FC, useCallback } from "react";
import { Text } from "@/text";
import { useAccount, useMutation } from "@orderly.network/hooks";
import { toast } from "@/toast";
import { modal } from "@/modal";

export interface AccountInfoProps {
  onDisconnect?: () => void;
  accountId?: string;

  close?: () => void;
}

export const AccountInfo: FC<AccountInfoProps> = (props) => {
  const { onDisconnect } = props;
  const { account, state } = useAccount();

  const [getTestUSDC, { isMutating }] = useMutation(
    "https://testnet-operator-evm.orderly.org/v1/faucet/usdc"
  );

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(state.address).then(() => {
      toast.success("Copied to clipboard");
    });
  }, [state]);

  const onGetClick = useCallback(() => {
    return modal
      .confirm({
        title: "Get test USDC",
        content:
          "We’re adding 1,000 test USDC to your balance, it will take up to 3 minutes to process. Please check later.",
        onOk: () => {
          return getTestUSDC({
            chain_id: account.wallet.chainId.toString(),
            user_address: state.address,
            broker_id: "woofi_dex",
          }).then((res: any) => {
            if (res.success) {
              toast.success("Get test USDC success");
            }
            return res;
          });
        },
      })
      .then(() => {
        // console.log("get test usdc");
        props.close?.();
      });
  }, [state]);

  return (
    <div>
      <div className="flex py-6">
        <div className="flex-1 flex items-center gap-2">
          <Blockie address={state.address} />
          <div className="flex flex-col">
            <Text rule={"address"}>{account.accountId}</Text>
            <div className="text-xs">Testnet</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton type="button" onClick={onCopy}>
            <Copy size={20} stroke="currentcolor" />
          </IconButton>
          <IconButton>
            <Share size={20} />
          </IconButton>
        </div>
      </div>
      <div className="py-4 grid grid-cols-2 gap-3">
        <Button variant={"outlined"} onClick={onGetClick} disabled={isMutating}>
          Get test USDC
        </Button>
        <Button
          variant={"outlined"}
          color={"sell"}
          onClick={() => {
            onDisconnect?.();
          }}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};
