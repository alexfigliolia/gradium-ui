import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { PersonRoleType, PropertyAddonType } from "GraphQL/Types";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import { AdminRoutes } from "Router/AdminRoutes";
import { grants, useScope } from "State/Scope";
import { Permissions } from "Tools/Permissions";
import type { Propless } from "Types/React";

export const LeasesLink = memo(
  function LeasesLink(_: Propless) {
    const userGrants = useScope(grants);
    const { slug, addons } = useCurrentProperty();

    const accessible = useMemo(() => {
      return (
        addons.some(a => a.type === PropertyAddonType.LeaseManagement) &&
        Permissions.hasPermission(userGrants, PersonRoleType.Manager)
      );
    }, [userGrants, addons]);

    const route = useMemo(() => AdminRoutes.slugRoute(slug, "leases"), [slug]);

    if (!accessible) {
      return null;
    }
    return (
      <NavLink to={route} className="leases-link">
        Leases
      </NavLink>
    );
  },
  () => true,
);
