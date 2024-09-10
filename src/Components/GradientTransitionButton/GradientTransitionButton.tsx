import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const GradientTransitionButton = memo(function GradientTransitionButton({
  label,
  className,
  ...rest
}: Props) {
  const classes = useClassNames("gradient-transition-button", className);
  return (
    <button {...rest} data-label={label} className={classes}>
      {label}
    </button>
  );
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}
