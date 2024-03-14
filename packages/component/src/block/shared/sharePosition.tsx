import { useModal } from "@/modal";
import { create } from "@/modal/modalHelper";
import { Sheet, SheetContent, SheetHeader } from "@/sheet/sheet";
import { Dialog, DialogContent } from "@/dialog/dialog";
import { useLeverage, useMediaQuery, useSymbolsInfo } from "@orderly.network/hooks";
import { MEDIA_TABLET } from "@orderly.network/types";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { DesktopSharePnLContent } from "./desktopSharePnl";
import { Logo } from "@/logo";
import { MobileSharePnLContent } from "./mobileSharePnl";

export const SharePoisitionView = create<{
    position: any
}>((props) => {

    const isTablet = useMediaQuery(MEDIA_TABLET);
    const { position } = props;
    const [leverage] = useLeverage();
    const symbolInfo = useSymbolsInfo()?.[position.symbol];

    const base_dp = symbolInfo?.("base_dp");
    const quote_dp = symbolInfo?.("quote_dp");
    const base_tick = symbolInfo?.("base_tick");
    const quote_tick = symbolInfo?.("quote_tick");

    console.log("symbolInfo", base_dp,
    quote_dp,
    base_tick,
    quote_tick,);
    

    return isTablet ?
        <MobileSharePnL
            position={position}
            leverage={leverage}
        /> :
        <DesktopSharePnL
            position={position}
            leverage={leverage}
        />;
});



const MobileSharePnL: FC<PropsWithChildren<{
    className?: string,
    position: any,
    leverage: number,
    baseDp?: number,
    quoteDp?: number,
}>> = (props) => {
    const { leverage, position, baseDp, quoteDp } = props;
    const { visible, hide, resolve, reject, onOpenChange } = useModal();

    return (<Sheet open={visible} onOpenChange={onOpenChange}>
        <SheetContent
        >
            <SheetHeader
                id="orderly-asset-and-margin-sheet-title"
                leading={<Logo.secondary size={30} />}
            >
                PnL Sharing
            </SheetHeader>
            <MobileSharePnLContent position={position} leverage={leverage} hide={hide} baseDp={baseDp} quoteDp={quoteDp} />
        </SheetContent>
    </Sheet>);
}

const DesktopSharePnL: FC<PropsWithChildren<{
    className?: string,
    position: any,
    leverage: number,
    baseDp?: number,
    quoteDp?: number,
}>> = (props) => {
    const { leverage, position, baseDp, quoteDp } = props;
    const { visible, hide, resolve, reject, onOpenChange } = useModal();

    const [viewportHeight, setViewportHeight] = useState(window.innerHeight < 900 ? 660 : 807);

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight < 900 ? 660 : 807);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    

    return (<Dialog open={visible} onOpenChange={onOpenChange}>
        <DialogContent
            className="orderly-shadow-lg orderly-w-[640px] orderly-bg-base-700 desktop:orderly-max-w-[640px]"
            style={{height: `${viewportHeight}px`}}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            >
            
            <div 
            style={{height: `${viewportHeight}px`}}
            >
            <DesktopSharePnLContent position={position} leverage={leverage} hide={hide} baseDp={baseDp} quoteDp={quoteDp}/>
            </div>
        </DialogContent>
    </Dialog>);
}