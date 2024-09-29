import type { ComponentType } from "react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { IconThemeLink } from "Components/IconThemeLink";

export const RelativeLink = memo(function RelativeLink({
  to,
  label,
  Icon,
}: Props) {
  return (
    <IconThemeLink to={to} Icon={Icon} Tag={NavLink}>
      {label}
    </IconThemeLink>
  );
});

interface Props {
  to: string;
  label: string;
  Icon: ComponentType;
}
