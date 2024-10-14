import { Fragment, memo } from "react";
import { usePropertyAccess } from "Hooks/usePropertyAccess";
import { BasketballCourt } from "Icons/BasketballCourt";
import { PropertyConfigurationTile } from "Layouts/PropertyConfiguration";
import { AdminRoutes } from "Router/AdminRoutes";
import type { OptionalChildren } from "Types/React";

const access = AdminRoutes.addons("PROPERTY_AMENITIES");

export const AmenitiesTile = memo(function AmenitiesTile({
  children,
}: OptionalChildren) {
  const accessible = usePropertyAccess(...access);
  if (!accessible) {
    return null;
  }
  return (
    <PropertyConfigurationTile
      title={
        <Fragment>
          <BasketballCourt /> Amenity Spaces
        </Fragment>
      }
      subtitle="Add an entry for each amenity that can be reserved by your residents">
      {children}
    </PropertyConfigurationTile>
  );
});
