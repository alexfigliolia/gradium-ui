import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const DownArrow = memo(function DownArrow({
  className,
  children,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("down-arrow", className);
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path d="M6.293,17.707a1,1,0,0,1,1.414-1.414L11,19.586V2a1,1,0,0,1,2,0V19.586l3.293-3.293a1,1,0,0,1,1.414,1.414l-5,5a1,1,0,0,1-1.414,0Z" />
      {children}
    </svg>
  );
});
