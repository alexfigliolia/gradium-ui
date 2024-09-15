import type { ForwardedRef, ReactNode } from "react";
import { forwardRef, memo, useRef } from "react";
import type { ISheetController } from "@figliolia/bottom-sheet";
import { BottomSheet } from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { Closer } from "Components/Closer";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const Confirmation = memo(
  forwardRef(function Confirmation(
    { open, close, children, className }: Props,
    ref: ForwardedRef<any>,
  ) {
    const ctrl = useRef<ISheetController>(null);
    console.log(ctrl.current);
    const classes = useClassNames("confirmation-sheet", className);
    return (
      <BottomSheet
        ref={ctrl}
        dim
        notch
        open={open}
        className={classes}
        close={close}>
        <Closer onClick={close} aria-label="Close Confirmation" />
        {children}
      </BottomSheet>
    );
  }),
);

interface Props {
  open: boolean;
  close: Callback;
  className?: string;
  children?: ReactNode;
}
