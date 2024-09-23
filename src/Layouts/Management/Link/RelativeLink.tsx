import type { ComponentType } from "react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

export const RelativeLink = memo(function RelativeLink({
  to,
  label,
  Icon,
}: Props) {
  return (
    <NavLink to={to} className="icon-theme-link">
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
}
