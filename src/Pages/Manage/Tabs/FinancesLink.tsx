import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { PersonRoleType } from "GraphQL/Types";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import { AdminRoutes } from "Router/AdminRoutes";
import { grants, useScope } from "State/Scope";
import { Permissions } from "Tools/Permissions";
import type { Propless } from "Types/React";

export const FinancesLink = memo(
  function FinancesLink(_: Propless) {
    const userGrants = useScope(grants);
    const { slug } = useCurrentProperty();

    const accessible = useMemo(() => {
      return Permissions.hasPermission(userGrants, PersonRoleType.Owner);
    }, [userGrants]);

    const route = useMemo(
      () => AdminRoutes.slugRoute(slug, "finances"),
      [slug],
    );

    if (!accessible) {
      return null;
    }
    return (
      <NavLink to={route} className="finances-link">
        Finances
      </NavLink>
    );
  },
  () => true,
);
