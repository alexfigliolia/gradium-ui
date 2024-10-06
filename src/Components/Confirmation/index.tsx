import type { ReactNode } from "react";
import { memo } from "react";
import { BottomSheet } from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { BodyPortal } from "Components/BodyPortal";
import { Closer } from "Components/Closer";
import { Devices } from "Tools/Devices";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const Confirmation = memo(function Confirmation({
  open,
  close,
  children,
  className,
  clickOutside,
}: Props) {
  const classes = useClassNames("confirmation-sheet", className, {
    mobile: Devices.IS_MOBILE_BROWSER,
  });
  return (
    <BodyPortal>
      <BottomSheet
        dim
        notch
        open={open}
        close={close}
        className={classes}
        clickOutside={clickOutside}>
        <Closer onClick={close} aria-label="Close Confirmation" />
        {children}
      </BottomSheet>
    </BodyPortal>
  );
});

interface Props {
  open: boolean;
  close: Callback;
  clickOutside?: boolean;
  className?: string;
  children?: ReactNode;
}
