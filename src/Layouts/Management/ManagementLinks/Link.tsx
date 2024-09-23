import type { ComponentType } from "react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";

export const Link = memo(function Link({ label, to, Icon, className }: Props) {
  const classes = useClassNames("icon-theme-link", className);
  return (
    <NavLink to={to} className={classes}>
      <div>
        <Icon aria-hidden />
        <Icon aria-hidden />
      </div>
      {label}
    </NavLink>
  );
});

interface Props {
  to: string;
  label: string;
  Icon: ComponentType;
  className?: string;
}
