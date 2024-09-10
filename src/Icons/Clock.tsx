import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const Clock = memo(function Clock({
  className,
  children,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("clock-icon", className);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      <path
        d="M12 8V12L14.5 14.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
});
