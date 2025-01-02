import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const Attachment = memo(function Attachment({
  className,
  children,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("attachment-icon", className);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path
        d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547M14.429 6.88674L7.00403 13.8812C6.67583 14.1907 6.49144 14.6106 6.49144 15.0483C6.49144 15.4861 6.67583 15.9059 7.00403 16.2154C7.33224 16.525 7.77738 16.6989 8.24154 16.6989C8.70569 16.6989 9.15083 16.525 9.47904 16.2154L13.502 12.4254M8.55638 7.75692L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L16.5 9.601"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
});
