import { memo } from "react";
import type { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const GradientTransitionLink = memo(function GradientTransitionLink({
  label,
  children,
  className,
  ...rest
}: Props) {
  const classes = useClassNames("gradient-transition-button", className);
  return (
    <Link {...rest} data-label={label} className={classes}>
      {label}
      {children}
    </Link>
  );
});

interface Props extends LinkProps {
  label: string;
}
