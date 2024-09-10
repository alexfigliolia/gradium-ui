import { memo } from "react";
import { Confirmation } from "Components/Confirmation";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const FilterMenu = memo(function FilterMenu({
  open,
  title,
  close,
  children,
}: Props) {
  return (
    <Confirmation open={open} className="filter-menu" close={close}>
      {title && <h2>{title}</h2>}
      <div className="filters">{children}</div>
    </Confirmation>
  );
});

interface Props extends OptionalChildren {
  title?: string;
  open: boolean;
  close: Callback;
}
