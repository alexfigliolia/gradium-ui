import type { SVGAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";

export const At = memo(function At({ children, className, ...rest }: Props) {
  const classes = useClassNames("at-icon", className);
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={classes}
      {...rest}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 20.064A9 9 0 1 1 21 12v1.5a2.5 2.5 0 0 1-5 0V8m0 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      />
      {children}
    </svg>
  );
});

interface Props extends OptionalChildren, SVGAttributes<SVGSVGElement> {}
