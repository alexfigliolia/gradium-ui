import type { SVGAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const X = memo(function X({
  className,
  children,
  ...rest
}: SVGAttributes<SVGSVGElement>) {
  const classes = useClassNames("x-icon", className);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <g id="Menu / Close_LG">
        <path
          d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {children}
    </svg>
  );
});
