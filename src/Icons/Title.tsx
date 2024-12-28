import type { SVGAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const Title = memo(function Title({
  className,
  children,
  ...rest
}: SVGAttributes<SVGSVGElement>) {
  const classes = useClassNames("title-icon", className);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path
        d="M12 6V19M6 6H18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
});
