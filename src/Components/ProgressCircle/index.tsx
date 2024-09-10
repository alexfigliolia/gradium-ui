import type { HTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const ProgressCircle = memo(function ProgressCircle({
  progress,
  children,
  className,
  ...rest
}: IProgressCircle) {
  const classes = useClassNames("progress-circle", className);
  return (
    <div className={classes} {...rest}>
      <svg viewBox="0 0 100 100">
        <circle cx="50%" cy="50%" r={50} />
        <circle
          cx="50%"
          cy="50%"
          r={50}
          strokeDashoffset={314 - (314 * progress) / 100}
        />
      </svg>
      <div className="content">{children}</div>
    </div>
  );
});

export interface IProgressCircle extends HTMLAttributes<HTMLDivElement> {
  progress: number;
}
