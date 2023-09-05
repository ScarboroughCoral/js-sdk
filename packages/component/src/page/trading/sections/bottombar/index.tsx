import { AccountStatusBar } from "@/block/accountStatus";
import { WalletConnectSheet } from "@/block/walletConnect";
import { modal } from "@/modal";
import {
  useAccount,
  useCollateral,
  useAccountInfo,
  OrderlyContext,
} from "@orderly.network/hooks";
import { AccountStatusEnum } from "@orderly.network/types";

import { useCallback, useContext } from "react";

export const BottomNavBar = () => {
  const { account, login, state, disconnect, connect } = useAccount();
  const { data } = useAccountInfo();
  const { totalValue } = useCollateral();
  // const { onWalletConnect } = useContext(OrderlyContext);

  const onConnect = useCallback(() => {
    connect().then((result: { wallet: any; status: AccountStatusEnum }) => {
      if (result && result.status < AccountStatusEnum.EnableTrading) {
        modal.show(WalletConnectSheet, {
          status: result.status,
        });
      }
    });
  }, []);

  return (
    <div className="fixed left-0 bottom-0 w-screen bg-base-200 p-2 border-t border-base-300 z-30">
      <AccountStatusBar
        chains={[]}
        status={state.status}
        address={state.address}
        accountInfo={data}
        totalValue={totalValue}
        onConnect={onConnect}
        onDisconnect={disconnect}
      />
    </div>
  );
};
