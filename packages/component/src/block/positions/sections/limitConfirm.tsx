import { Divider } from "@/divider";
import { NetworkImage } from "@/icon";
import { Numeral, Text } from "@/text";
import { NumeralTotal } from "@/text/numeralTotal";
import { API, OrderEntity, OrderSide } from "@orderly.network/types";
import { FC } from "react";

interface Props {
  order: OrderEntity;
  base: string;
  quote: string;
  side: OrderSide;
}

export const LimitConfirm: FC<Props> = (props) => {
  const { order, quote, side } = props;

  return (
    <div>
      <div className="space-y-3">
        <div className="font-medium text-base">
          {`You will close ${order.order_quantity} ETH position at limit price.`}
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mb-4 text-lg flex items-center gap-2">
        <NetworkImage type={"coin"} name={"ETH"} />
        <Text rule="symbol">{order.symbol}</Text>
      </div>
      <div className="grid grid-cols-[1fr_2fr] text-base">
        <div className="flex flex-col">
          <Text type={side === OrderSide.SELL ? "sell" : "buy"}>
            {side === OrderSide.SELL ? "Limit Sell" : "Limit Buy"}
          </Text>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-base-contrast/50">Qty.</span>
            <Text type={side === OrderSide.SELL ? "sell" : "buy"}>
              {order.order_quantity}
            </Text>
          </div>
          <div className="flex justify-between">
            <span className="text-base-contrast/50">Price</span>
            {/* <span>131311</span> */}
            <Text
              surfix={<span className="text-base-contrast/50">{quote}</span>}
            >
              {order.order_price}
            </Text>
          </div>
          <div className="flex justify-between">
            <span className="text-base-contrast/50">Total</span>
            <NumeralTotal
              quantity={order.order_quantity ?? 0}
              price={order.order_price ?? 0}
              surfix={<span className="text-base-contrast/50">{quote}</span>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
