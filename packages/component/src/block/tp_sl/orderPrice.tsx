import { useTPSLOrderRowContext } from "./tpslOrderRowContext";

export const OrderPrice = () => {
  const { sl_trigger_price, tp_trigger_price } = useTPSLOrderRowContext();
  return (
    <div>
      {!!tp_trigger_price ? (
        <div className={"orderly-text-base-contrast-80"}>
          <span className={"orderly-text-base-contrast-54"}>TP-</span>
          <span>Market</span>
        </div>
      ) : null}
      {!!sl_trigger_price ? (
        <div className={"orderly-text-base-contrast-80"}>
          <span className={"orderly-text-base-contrast-54"}>SL-</span>
          <span>Market</span>
        </div>
      ) : null}
    </div>
  );
};
