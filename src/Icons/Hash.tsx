import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const Hash = memo(function Hash({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("hash-icon", className);
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path
        d="M4 8H20M4 16H20M8 3V21M16 3V21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
});
