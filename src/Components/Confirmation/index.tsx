import type { ForwardedRef } from "react";
import { forwardRef, memo } from "react";
import type {
  IBottomSheetProps,
  ISheetController,
} from "@figliolia/bottom-sheet";
import { BottomSheet } from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { BodyPortal } from "Components/BodyPortal";
import { Closer } from "Components/Closer";
import { selectWidth, useScreen } from "State/Screen";
import { Devices } from "Tools/Devices";
import "./styles.scss";

export const Confirmation = memo(
  forwardRef(function Confirmation(
    { children, className, ...rest }: Omit<IBottomSheetProps, "dim" | "notch">,
    ref: ForwardedRef<ISheetController>,
  ) {
    const width = useScreen(selectWidth);
    const classes = useClassNames("confirmation-sheet", className, {
      mobile: Devices.IS_MOBILE_BROWSER && width < 670,
    });
    return (
      <BodyPortal>
        <BottomSheet dim notch ref={ref} className={classes} {...rest}>
          <Closer onClick={rest.close} aria-label="Close Dialog" />
          {children}
        </BottomSheet>
      </BodyPortal>
    );
  }),
);
