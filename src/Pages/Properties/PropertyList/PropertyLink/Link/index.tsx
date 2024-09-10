import type { ReactNode } from "react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const Link = memo(function Link({ to, text, icon, className }: Props) {
  const classes = useClassNames("property-link-to", className);
  return (
    <NavLink to={to} className={classes} data-text-content={text}>
      {text}
      <div aria-hidden className="text-cover">
        {text} {icon}
      </div>
      <div aria-hidden className="gradient-cover" />
    </NavLink>
  );
});

interface Props {
  to: string;
  text: string;
  icon?: ReactNode;
  className?: string;
}
