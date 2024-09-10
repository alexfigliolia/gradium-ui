import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const Keys = memo(function Keys({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("keys-icon", className);
  return (
    <svg
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path
        d="M12.75 9.807C12.7497 8.68487 12.4348 7.5853 11.8409 6.63318C11.247 5.68107 10.3981 4.91457 9.39043 4.42075C8.38279 3.92693 7.25687 3.72558 6.14053 3.83956C5.0242 3.95355 3.9622 4.3783 3.07516 5.06558C2.18812 5.75286 1.51159 6.67512 1.12241 7.7276C0.733232 8.78009 0.647 9.92062 0.87351 11.0197C1.10002 12.1187 1.63019 13.1322 2.40381 13.945C3.17744 14.7579 4.1635 15.3375 5.25 15.618V21.754C5.25 22.1518 5.40804 22.5334 5.68934 22.8147C5.97065 23.096 6.35218 23.254 6.75 23.254C7.14783 23.254 7.52936 23.096 7.81066 22.8147C8.09197 22.5334 8.25 22.1518 8.25 21.754V15.618C9.53819 15.2854 10.6793 14.5341 11.4939 13.4822C12.3085 12.4303 12.7503 11.1374 12.75 9.807V9.807Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.74121 4.605C10.8897 3.94419 12.2247 3.68215 13.5377 3.85976C14.8508 4.03737 16.0682 4.64464 16.9998 5.58682C17.9315 6.529 18.5251 7.75309 18.688 9.06808C18.8509 10.3831 18.5739 11.715 17.9002 12.856L22.8102 17.762C23.0834 18.0449 23.2346 18.4238 23.2312 18.8171C23.2278 19.2104 23.0701 19.5866 22.7919 19.8647C22.5138 20.1428 22.1376 20.3006 21.7443 20.304C21.351 20.3074 20.9721 20.1562 20.6892 19.883L15.7822 14.977C15.1145 15.3711 14.3765 15.6314 13.6096 15.7434H13.5664"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 10.557C7.57843 10.557 8.25 9.88543 8.25 9.057C8.25 8.22857 7.57843 7.557 6.75 7.557C5.92157 7.557 5.25 8.22857 5.25 9.057C5.25 9.88543 5.92157 10.557 6.75 10.557Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 7.40625V3C6.75 2.40326 6.98705 1.83097 7.40901 1.40901C7.83097 0.987053 8.40326 0.75 9 0.75C9.59674 0.75 10.169 0.987053 10.591 1.40901C11.0129 1.83097 11.25 2.40326 11.25 3V3.76562"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
});
