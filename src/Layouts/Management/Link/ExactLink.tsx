import type { ComponentType } from "react";
import { memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const ExactLink = memo(function ExactLink({ to, Icon, label }: Props) {
  const { pathname } = useLocation();
  const active = useMemo(() => pathname === to, [to, pathname]);
  const classes = useClassNames("icon-theme-link", { active });
  return (
    <Link to={to} className={classes}>
      <div>
        <Icon aria-hidden />
        <Icon aria-hidden />
      </div>
      {label}
    </Link>
  );
});

interface Props {
  to: string;
  label: string;
  Icon: ComponentType;
}
