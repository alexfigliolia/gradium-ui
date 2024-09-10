import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const GradientButton = memo(function GradientButton({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = useClassNames("gradient-button", className);
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
});
