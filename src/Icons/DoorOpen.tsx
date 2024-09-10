import type { SVGProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";

export const DoorOpen = memo(function DoorOpen({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  const classes = useClassNames("door-open-icon", className);
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      {...rest}>
      <path d="M5 5v14a1 1 0 0 0 1 1h3v-2H7V6h2V4H6a1 1 0 0 0-1 1zm14.242-.97-8-2A1 1 0 0 0 10 3v18a.998.998 0 0 0 1.242.97l8-2A1 1 0 0 0 20 19V5a1 1 0 0 0-.758-.97zM15 12.188a1.001 1.001 0 0 1-2 0v-.377a1 1 0 1 1 2 .001v.376z" />
      {children}
    </svg>
  );
});
