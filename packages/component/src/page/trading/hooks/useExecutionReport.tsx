import { useEffect, useRef } from "react";
import { toast } from "@/toast";
import { getOrderExecutionReportMsg } from "@/block/orders/getOrderExecutionReportMsg";
import { useSymbolsInfo, useWS, useEventEmitter } from "@orderly.network/hooks";

export function useExecutionReport() {
  const ws = useWS();
  const ee = useEventEmitter();

  const symbolsInfo = useSymbolsInfo();
  const symbolsInfoRef = useRef({});

  const timer = useRef<any>({});
  const timestamp = useRef<any>({});

  useEffect(() => {
    symbolsInfoRef.current = symbolsInfo;
  }, [symbolsInfo]);

  useEffect(() => {
    const showToast = (data: any) => {
      const { title, msg } = getOrderExecutionReportMsg(
        data,
        symbolsInfoRef.current
      );

      if (title && msg) {
        toast.success(
          <div>
            {title}
            <br />
            <div className="text-white/[0.54]">{msg}</div>
          </div>
        );
      }
    };

    const unsubscribe = ws.privateSubscribe(
      {
        id: "executionreport",
        event: "subscribe",
        topic: "executionreport",
        ts: Date.now(),
      },
      {
        onMessage: (data: any) => {
          // console.log("useExecutionReport", data);
          showToast(data);

          const key = `${data.status}_${data.orderId}_${data.timestamp}`;

          // 如果100豪秒内有一样的订单状态更新
          if (
            timestamp.current[key] &&
            Date.now() - timestamp.current[key] < 100
          ) {
            timer.current[key] && clearTimeout(timer.current[key]);
          }
          timer.current[key] = setTimeout(() => {
            showToast(data);
            delete timer.current[key];
            delete timestamp.current[key];
            ee.emit("orders:changed", data);
          }, 100);
          timestamp.current[key] = Date.now();
        },
      }
    );
    return () => unsubscribe();
  }, []);
}