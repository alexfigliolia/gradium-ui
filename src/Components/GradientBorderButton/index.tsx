import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const GradientBorderButton = memo(function GradientBorderButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = useClassNames("gradient-border-button", className);
  return (
    <button className={classes} {...rest}>
      <div>{children}</div>
    </button>
  );
});
