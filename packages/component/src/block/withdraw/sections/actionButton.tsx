import Button from "@/button";
import { StatusGuardButton } from "@/button/statusGuardButton";
import { toast } from "@/toast";
import { API, Chain, ChainConfig, CurrentChain } from "@orderly.network/types";
import { int2hex } from "@orderly.network/utils";
import { FC, useEffect, useMemo, useState } from "react";

export interface ActionButtonProps {
  chains?: API.NetworkInfos[];
  chain: CurrentChain | null;
  onWithdraw: () => void;
  disabled: boolean;
  switchChain: (options: { chainId: string }) => Promise<any>;
  openChainPicker?: () => Promise<{ id: number; name: string }>;
  // chainInfo?: ChainConfig;
  quantity: string;
  loading?: boolean;
  // chainNotSupport: boolean;
}

export const ActionButton: FC<ActionButtonProps> = (props) => {
  const {
    chain,
    chains,
    onWithdraw,
    switchChain,
    disabled,
    openChainPicker,
    // chainInfo,
    quantity,
    loading,
    // chainNotSupport,
  } = props;

  const [chainNotSupport, setChainNotSupport] = useState(false);

  // 检查 chain 是否支持，需要单独处理，因为deposit可以支持cross, withdraw不行

  const checkSupoort = (
    chain: CurrentChain | null,
    chains: API.NetworkInfos[] | undefined
  ): boolean => {
    if (!chain || !chains) return false;

    const index = chains?.findIndex((c) => c.chain_id === chain.id);

    return index < 0;
  };

  const chainWarningMessage = useMemo(() => {
    if (!chainNotSupport) return "";

    if (chains?.length && chains.length > 1) {
      return `Withdrawals are not supported on ${chain?.info?.network_infos?.name}. Please switch to any of the bridgeless networks.`;
    }

    return `Withdrawals are not supported on ${chain?.info?.network_infos?.name}. Please switch to Arbitrum.`;
  }, [chainNotSupport, chains, chain]);

  useEffect(() => {
    setChainNotSupport(checkSupoort(chain, chains));
  }, [chains?.length, chain?.id]);

  const swtichChain = (chainId: number) => {
    toast.promise(switchChain({ chainId: int2hex(chainId) }), {
      loading: "Loading",
      success: (data) => `Successfully`,
      error: (err) => `Error: ${err.toString()}`,
    });
  };

  const actionButton = useMemo(() => {
    if (!chainNotSupport) {
      return (
        <StatusGuardButton>
          <Button
            fullWidth
            onClick={onWithdraw}
            disabled={props.disabled || props.loading}
            loading={loading}
          >
            Withdraw
          </Button>
        </StatusGuardButton>
      );
    }

    if (chains?.length === 1) {
      return (
        <Button
          fullWidth
          onClick={() => {
            const chain = chains[0];
            // console.log(chain);
            if (chain) {
              swtichChain(chain.chain_id);
              // toast.promise(
              //   switchChain({ chainId: int2hex(chain.chain_id) }),
              //   {
              //     loading: "Loading",
              //     success: (data) => `Successfully`,
              //     error: (err) => `Error: ${err.toString()}`,
              //   }
              // );
            }
          }}
        >
          Switch to Arbitrum
        </Button>
      );
    }
    return (
      <Button
        fullWidth
        onClick={() =>
          openChainPicker?.().then(({ id }) => {
            swtichChain(id);
          })
        }
      >
        Switch Network
      </Button>
    );
  }, [
    chainNotSupport,
    chains,
    switchChain,
    disabled,
    chain,
    quantity,
    loading,
  ]);

  return (
    <>
      {chainNotSupport && (
        <div className="text-warning text-sm text-center px-[20px] py-3">
          {chainWarningMessage}
        </div>
      )}

      <div className="flex justify-center">
        <div className="py-3 min-w-[200px]">{actionButton}</div>
      </div>
    </>
  );
};