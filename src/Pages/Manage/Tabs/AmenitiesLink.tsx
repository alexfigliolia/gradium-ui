import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { usePropertyAccess } from "Hooks/usePropertyAccess";
import { AdminRoutes } from "Router/AdminRoutes";
import { currentProperty, useProperties } from "State/Properties";
import { grants, useScope } from "State/Scope";
import { Permission } from "Tools/Permission";
import type { Propless } from "Types/React";

const { permissions, addons } = AdminRoutes.access("PROPERTY_AMENITIES");

export const AmenitiesLink = memo(
  function AmenitiesLink(_: Propless) {
    const userGrants = useScope(grants);
    const { slug } = useProperties(currentProperty);

    const hasAddon = usePropertyAccess(...addons);

    const accessible = useMemo(() => {
      return hasAddon && Permission.hasPermission(userGrants, ...permissions);
    }, [userGrants, hasAddon]);

    const route = useMemo(
      () => AdminRoutes.slugRoute(slug, "amenities"),
      [slug],
    );

    if (!accessible) {
      return null;
    }
    return (
      <NavLink to={route} className="amenities-link">
        Amenities
      </NavLink>
    );
  },
  () => true,
);
