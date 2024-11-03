import type { ReactNode } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Checkable = memo(function Checkable({
  label,
  children,
  selected,
}: Props) {
  const classes = useClassNames("checkable", { selected });
  return (
    <label className={classes}>
      <div>{children}</div>
      {label}
    </label>
  );
});

interface Props extends OptionalChildren {
  label: ReactNode;
  selected: boolean;
}
