import { memo } from "react";
import type { NavLinkProps } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const GradientBorderLink = memo(function GradientBorderLink({
  className,
  children,
  ...rest
}: Props) {
  const classes = useClassNames(
    "gradient-border-button",
    "gradient-border-link",
    className,
  );
  return (
    <NavLink className={classes} {...rest}>
      <div>{children}</div>
    </NavLink>
  );
});

interface Props
  extends Omit<NavLinkProps, "children" | "className">,
    OptionalChildren {
  className?: string;
}
