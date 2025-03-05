import { useClassNames } from "@figliolia/classnames";
import { DataViewer } from "Components/DataViewer";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";

export const LeaseViewer = ({ open, close, className, children }: Props) => {
  const classes = useClassNames("lease-viewer", className);
  return (
    <DataViewer className={classes} open={open} close={close}>
      {children}
    </DataViewer>
  );
};

interface Props extends OptionalChildren {
  open: boolean;
  close: Callback;
  className?: string;
}
