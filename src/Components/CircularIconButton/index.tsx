import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const CircularIconButton = memo(function CircularIconButton({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = useClassNames("circular-icon-button", className);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
});
