import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AdminRoutes } from "Router/AdminRoutes";
import { currentProperty, useProperties } from "State/Properties";
import { grants, useScope } from "State/Scope";
import { Permission } from "Tools/Permission";
import type { Propless } from "Types/React";

const permissions = AdminRoutes.permissions("PROPERTY_CONFIGURATION");

export const ConfigureLink = memo(
  function ConfigureLink(_: Propless) {
    const userGrants = useScope(grants);
    const { slug } = useProperties(currentProperty);

    const accessible = useMemo(() => {
      return Permission.hasPermission(userGrants, ...permissions);
    }, [userGrants]);

    const route = useMemo(
      () => AdminRoutes.slugRoute(slug, "configure"),
      [slug],
    );

    if (!accessible) {
      return null;
    }
    return (
      <NavLink to={route} className="configure-link">
        Configure
      </NavLink>
    );
  },
  () => true,
);
