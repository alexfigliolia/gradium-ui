import type { SVGProps } from "react";
import { useClassNames } from "@figliolia/classnames";

export const Refresh = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  const classes = useClassNames("refresh-icon", className);
  return (
    <svg viewBox="0 0 24 24" className={classes} {...rest}>
      <path
        d="M13 2L11 3.99545L11.0592 4.05474M11 18.0001L13 19.9108L12.9703 19.9417M11.0592 4.05474L13 6M11.0592 4.05474C11.3677 4.01859 11.6817 4 12 4C16.4183 4 20 7.58172 20 12C20 14.5264 18.8289 16.7793 17 18.2454M7 5.75463C5.17107 7.22075 4 9.47362 4 12C4 16.4183 7.58172 20 12 20C12.3284 20 12.6523 19.9802 12.9703 19.9417M11 22.0001L12.9703 19.9417"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
};
