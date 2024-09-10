import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Tile = memo(function Tile({
  TagName = "div",
  className,
  children,
}: Props) {
  const classes = useClassNames("tile", className);
  return <TagName className={classes}>{children}</TagName>;
});

interface Props extends OptionalChildren {
  className?: string;
  TagName?: "div" | "form" | "section";
}
