import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const SVGCircle = memo(function SVGCircle({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("svg-circle", className);
  return (
    <svg className={classes} {...rest}>
      <circle cx="50%" cy="50%" r="50%" pathLength="100" />
    </svg>
  );
});
