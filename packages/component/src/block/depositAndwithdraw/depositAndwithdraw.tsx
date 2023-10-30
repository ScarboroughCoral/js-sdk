import { TabPane, Tabs } from "@/tab";
import { ArrowDownToLine, ArrowUpToLine } from "lucide-react";
import { FC, useState } from "react";
import { Withdraw } from "../withdraw";
import { Deposit } from "../deposit/deposit";
import { create } from "@/modal/modalHelper";
import { useModal } from "@/modal";
import { Sheet, SheetContent } from "@/sheet";
import { AssetsProvider } from "@/provider/assetsProvider";

type activeName = "deposit" | "withdraw";

interface DepositAndWithdrawProps {
  activeTab: activeName;
  onCancel?: () => void;
  onOk?: () => void;
}

export const DepositAndWithdraw: FC<DepositAndWithdrawProps> = (props) => {
  const [value, setValue] = useState<any>(() => props.activeTab ?? "deposit");

  return (
    <AssetsProvider>
      <Tabs
        value={value}
        onTabChange={setValue}
        tabBarClassName="border-b-0 px-0"
      >
        <TabPane
          title={
            <div className="flex items-center gap-1">
              <ArrowDownToLine size={15} /> <span>Deposit</span>
            </div>
          }
          value="deposit"
        >
          <div className="py-3 px-[2px]">
            <Deposit
              onOk={props.onOk}
              dst={{
                chainId: 0,
                address: "",
                decimals: 0,
                symbol: "",
                network: "",
              }}
            />
          </div>
        </TabPane>
        <TabPane
          title={
            <div className="flex items-center gap-1">
              <ArrowUpToLine size={15} /> <span>Withdraw</span>
            </div>
          }
          value="withdraw"
        >
          <div className="py-3 px-[2px]">
            <Withdraw onOk={props.onOk} />
          </div>
        </TabPane>
      </Tabs>
    </AssetsProvider>
  );
};

export const DepositAndWithdrawWithSheet = create<DepositAndWithdrawProps>(
  (props) => {
    const { visible, hide, resolve, reject, onOpenChange } = useModal();

    const onOk = (data?: any) => {
      resolve(data);
      hide();
    };

    return (
      <Sheet open={visible} onOpenChange={onOpenChange}>
        <SheetContent>
          <DepositAndWithdraw activeTab={props.activeTab} onOk={onOk} />
        </SheetContent>
      </Sheet>
    );
  }
);