import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const Bath = memo(function Bath({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("bath-icon", className);
  return (
    <svg
      version="1.1"
      viewBox="0 0 330.001 330.001"
      xmlSpace="preserve"
      className={classes}
      {...rest}>
      <path
        d="M315,150h-5V55c0-30.327-24.673-55-55-55c-30.327,0-55,24.673-55,55v15h-5c-8.284,0-15,6.716-15,15
	s6.716,15,15,15h40c8.284,0,15-6.716,15-15s-6.716-15-15-15h-5V55c0-13.785,11.215-25,25-25c13.785,0,25,11.215,25,25v95H35H15
	c-8.284,0-15,6.716-15,15s6.716,15,15,15h5v65c0,30.678,21.369,56.442,50,63.233v6.768c0,8.284,6.716,15,15,15
	c8.284,0,15-6.716,15-15V310h130v5.001c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-6.768c28.631-6.792,50-32.556,50-63.233v-65
	h5c8.284,0,15-6.716,15-15S323.285,150,315,150z M280,245c0,19.299-15.701,35-35,35h-160c-19.299,0-35-15.701-35-35v-65h230V245z"
      />
      {children}
    </svg>
  );
});
