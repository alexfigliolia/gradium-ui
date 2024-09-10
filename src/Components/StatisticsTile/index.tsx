import type { ReactNode } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Tile } from "Components/Tile";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const StatisticsTile = memo(function StatisticsTile({
  title,
  children,
  className,
}: Props) {
  const classes = useClassNames("stats-tile", className);
  return (
    <Tile className={classes}>
      <div>{title}</div>
      {children}
    </Tile>
  );
});
interface Props extends OptionalChildren {
  title: ReactNode;
  className?: string;
}
