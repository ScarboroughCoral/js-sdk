import { FC, useCallback, useContext, useMemo } from "react";
import Button from "@/button";
import { Divider } from "@/divider";
import { Input } from "@/input";
import { Slider } from "@/slider";
import { Statistic } from "@/statistic";
import { Text } from "@/text";
import { useOrderEntry, useSymbolsInfo } from "@orderly.network/hooks";
import { API, OrderEntity, OrderSide, OrderType } from "@orderly.network/types";
import { Controller, useForm } from "react-hook-form";
import { modal } from "@/modal";
import { toast } from "@/toast";
import { commify } from "@orderly.network/utils";
import { OrderListContext } from "../../orderListContext";

interface OrderEditFormProps {
  // symbol: string;
  order: API.Order;
  onSubmit: (values: OrderEntity) => Promise<any>;
  // onComplete?: (values: OrderEntity) => void;
  onCancel: () => void;
}

export const OrderEditForm: FC<OrderEditFormProps> = (props) => {
  const { order, onSubmit } = props;

  // const { hide, reject, resolve } = useModal();

  const { markPrice, maxQty, helper } = useOrderEntry(order.symbol, order.side);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,

    formState: { errors, submitCount, isSubmitting, isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      order_price: order.price?.toString(),
      order_quantity: order.quantity.toString(),
      symbol: order.symbol,
      order_type: order.type,
      side: order.side,
    },
    // values: {

    // },
    resolver: async (values) => {
      const errors = await helper.validator(values);
      return {
        values,
        errors,
      };
    },
  });

  const symbolInfo = useSymbolsInfo()[order.symbol];

  // console.log(symbolInfo());

  const base = useMemo(() => symbolInfo("base"), [symbolInfo]);
  const quote = useMemo(() => symbolInfo("quote"), [symbolInfo]);

  const typeText = useMemo(() => {
    if (order.side === OrderSide.SELL)
      return <Text type={"sell"}>Limit Sell</Text>;
    return <Text type={"buy"}>Limit Buy</Text>;
  }, [order]);

  const onConfirm = (data: OrderEntity, dirtyFields: any) => {
    let alertText;

    if (dirtyFields["order_price"] && dirtyFields["order_quantity"]) {
      alertText = (
        <div>
          You agree changing the price of ETH-PERP order to{" "}
          <span className="text-warning text-base">
            {commify(data.order_price!)}
          </span>{" "}
          and the quantity to{" "}
          <span className="text-warning text-base">
            {commify(data.order_quantity!)}
          </span>
          .
        </div>
      );
    } else {
      if (dirtyFields["order_price"]) {
        alertText = (
          <div>
            You agree changing the price of ETH-PERP order to{" "}
            <span className="text-warning text-base">
              {commify(data.order_price!)}
            </span>
            .
          </div>
        );
      }

      if (dirtyFields["order_quantity"]) {
        alertText = (
          <div>
            You agree changing the quantity of ETH-PERP order to{" "}
            <span className="text-warning text-base">
              {commify(data.order_quantity!)}
            </span>
            .
          </div>
        );
      }
    }

    return modal.confirm({
      title: "Edit Order",
      content: alertText,
      onOk: () => Promise.resolve(data),
    });
  };

  const onFormSubmit = useCallback(
    (data: any) => {
      return onConfirm(data, dirtyFields).then(
        (data: any) => {
          return onSubmit(data);
        },
        () => {
          console.log("cancel");
        }
      );
    },
    [quote, order, dirtyFields]
  );

  const onFieldChange = (name: string, value: any) => {
    const newValues = helper.calculate(getValues(), name, value);
    // console.log("newValues", newValues);

    if (name === "order_price") {
      setValue("order_price", newValues.order_price, {
        shouldValidate: submitCount > 0,
        shouldDirty: true,
      });
    }

    setValue("order_quantity", newValues.order_quantity, {
      shouldValidate: submitCount > 0,
      shouldDirty: true,
    });
  };

  if (!order) return null;

  return (
    <>
      <div className="pb-3 pt-5">
        <Text rule="symbol">{order.symbol}</Text>
      </div>
      <div className="grid grid-cols-2">
        <Statistic
          label="Order Type"
          value={typeText}
          labelClassName="text-sm text-base-contrast/30"
        />
        <Statistic
          label="Last Price"
          value={markPrice}
          rule="price"
          labelClassName="text-sm text-base-contrast/30"
        />
      </div>
      <Divider className="py-5" />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-5">
          <Controller
            name="order_price"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  prefix="Price"
                  suffix={quote}
                  type="number"
                  helpText={errors.order_price?.message}
                  error={!!errors.order_price}
                  className="text-right"
                  value={field.value!}
                  onChange={(e) => {
                    // field.onChange(e.target.value)
                    onFieldChange("order_price", e.target.value);
                  }}
                />
              );
            }}
          />
          <Controller
            name="order_quantity"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  prefix="Quantity"
                  suffix={base}
                  type="number"
                  helpText={errors.order_quantity?.message}
                  error={!!errors.order_quantity}
                  className="text-right"
                  value={field.value}
                  onChange={(e) => {
                    // field.onChange(e.target.value)
                    onFieldChange("order_quantity", e.target.value);
                  }}
                />
              );
            }}
          />
        </div>

        <div className="py-5">
          <Controller
            name="order_quantity"
            control={control}
            render={({ field }) => {
              // console.log([Number(field.value ?? 0)], symbolInfo("base_tick"));
              return (
                <Slider
                  step={symbolInfo("base_tick")}
                  min={0}
                  max={maxQty}
                  color={"buy"}
                  markCount={4}
                  value={[Number(field.value ?? 0)]}
                  onValueChange={(value) => {
                    onFieldChange("order_quantity", value[0].toString());
                  }}
                />
              );
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 py-5">
          <Button
            fullWidth
            type="button"
            color={"secondary"}
            onClick={() => {
              props.onCancel?.();
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            type="submit"
            loading={isSubmitting}
            disabled={!isDirty}
          >
            Confirm
          </Button>
        </div>
      </form>
    </>
  );
};