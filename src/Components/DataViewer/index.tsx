import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Confirmation } from "Components/Confirmation";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const DataViewer = memo(function DataViewer({
  open,
  close,
  className,
  children,
}: Props) {
  const classes = useClassNames("data-viewer", className);
  return (
    <Confirmation open={open} className={classes} close={close}>
      {children}
    </Confirmation>
  );
});

interface Props extends OptionalChildren {
  open: boolean;
  close: Callback;
  className?: string;
}
