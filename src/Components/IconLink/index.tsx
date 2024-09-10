import type { ComponentType, SVGAttributes } from "react";
import { Fragment, memo } from "react";
import { NavLink } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import { useActivePath } from "Hooks/useActivePath";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const IconLink = memo(function IconLink({
  path,
  label,
  matcher,
  className,
  StrokedIcon,
  FilledIcon,
}: Props) {
  const active = useActivePath(path, matcher);
  const classes = useClassNames(
    "icon-link",
    className,
    active ? "active" : undefined,
  );
  return (
    <Fragment>
      <NavLink to={path} className={classes}>
        <div>
          <StrokedIcon />
          <FilledIcon />
        </div>
        <span>{label}</span>
      </NavLink>
    </Fragment>
  );
});

interface Props {
  path: string;
  label: string;
  className?: string;
  matcher?: Callback<[path: string], boolean>;
  FilledIcon: ComponentType<SVGAttributes<SVGSVGElement>>;
  StrokedIcon: ComponentType<SVGAttributes<SVGSVGElement>>;
}
