import type { ReactNode } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ActionSheet } from "Components/ActionSheet";
import { Closer } from "Components/Closer";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const Confirmation = memo(function Confirmation({
  open,
  close,
  children,
  className,
}: Props) {
  const classes = useClassNames("confirmation-sheet", className);
  return (
    <ActionSheet dim notch open={open} className={classes} close={close}>
      <Closer onClick={close} aria-label="Close Confirmation" />
      {children}
    </ActionSheet>
  );
});

interface Props {
  open: boolean;
  close: Callback;
  className?: string;
  children?: ReactNode;
}
