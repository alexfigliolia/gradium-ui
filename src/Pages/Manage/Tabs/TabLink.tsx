import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import { AdminRoutes } from "Router/AdminRoutes";
import { currentProperty, useProperties } from "State/Properties";

export const TabLink = memo(function TabLink({ route }: Props) {
  const { slug } = useProperties(currentProperty);
  const link = useMemo(() => AdminRoutes.slugRoute(slug, route), [slug, route]);
  const classes = useClassNames("tab-link", route);
  return (
    <NavLink to={link} className={classes}>
      {route}
    </NavLink>
  );
});

interface Props {
  route: string;
}
