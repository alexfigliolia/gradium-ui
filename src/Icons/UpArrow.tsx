import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const UpArrow = memo(function UpArrow({
  className,
  children,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("up-arrow", className);
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path d="M11.293,1.293a1,1,0,0,1,1.414,0l5,5a1,1,0,0,1-1.414,1.414L13,4.414V22a1,1,0,0,1-2,0V4.414L7.707,7.707A1,1,0,0,1,6.293,6.293Z" />
      {children}
    </svg>
  );
});
