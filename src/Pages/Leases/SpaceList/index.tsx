import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const SpaceList = memo(function SpaceList({
  children,
  className,
}: Props) {
  const classes = useClassNames("space-list", className);
  return (
    <div className={classes}>
      <div>{children}</div>
    </div>
  );
});

interface Props extends OptionalChildren {
  className?: string;
}
