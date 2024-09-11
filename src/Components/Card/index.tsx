import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Card = memo(function Card({ className, children }: Props) {
  const classes = useClassNames("card", className);
  return <div className={classes}>{children}</div>;
});

interface Props extends OptionalChildren {
  className?: string;
}
