import type { ComponentType } from "react";
import { memo, useMemo } from "react";
import type { LinkProps } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import { IconThemeLink } from "Components/IconThemeLink";

export const ExactLink = memo(function ExactLink({
  to,
  Icon,
  label,
  ...rest
}: Props) {
  const { pathname } = useLocation();
  const active = useMemo(() => pathname === to, [to, pathname]);
  const classes = useClassNames({ active });
  return (
    <IconThemeLink to={to} className={classes} Icon={Icon} {...rest}>
      {label}
    </IconThemeLink>
  );
});

interface Props extends LinkProps {
  label: string;
  Icon: ComponentType;
}
