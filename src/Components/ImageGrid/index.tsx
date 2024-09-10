import type { HTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const ImageGrid = memo(function ImageGrid({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const classes = useClassNames("image-grid", className);
  return <div className={classes}>{children}</div>;
});
