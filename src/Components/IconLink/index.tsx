import type { ComponentType, SVGAttributes } from "react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import { useActivePath } from "Hooks/useActivePath";
import "./styles.scss";

export const IconLink = memo(function IconLink({
  path,
  label,
  className,
  StrokedIcon,
  FilledIcon,
}: Props) {
  const active = useActivePath(path);
  const classes = useClassNames(
    "icon-link",
    className,
    active ? "active" : undefined,
  );
  return (
    <NavLink to={path} className={classes}>
      <div>
        <StrokedIcon />
        <FilledIcon />
      </div>
      <span>{label}</span>
    </NavLink>
  );
});

interface Props {
  path: string;
  label: string;
  className?: string;
  FilledIcon: ComponentType<SVGAttributes<SVGSVGElement>>;
  StrokedIcon: ComponentType<SVGAttributes<SVGSVGElement>>;
}
