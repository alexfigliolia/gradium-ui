import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const Performance = memo(function Performance({
  className,
  children,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("performance-icon", className);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path
        d="M9.02 2.83992L3.63 7.03992C2.73 7.73992 2 9.22992 2 10.3599V17.7699C2 20.0899 3.89 21.9899 6.21 21.9899H17.79C20.11 21.9899 22 20.0899 22 17.7799V10.4999C22 9.28992 21.19 7.73992 20.2 7.04992L14.02 2.71992C12.62 1.73992 10.37 1.78992 9.02 2.83992Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 11.5L12.3 15.7L10.7 13.3L7.5 16.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 11.5H16.5V13.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
});
