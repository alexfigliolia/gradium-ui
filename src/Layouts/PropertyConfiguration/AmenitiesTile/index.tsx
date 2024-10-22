import { Fragment, memo } from "react";
import { usePropertyAccess } from "Hooks/usePropertyAccess";
import { BasketballCourt } from "Icons/BasketballCourt";
import { AdminRoutes } from "Router/AdminRoutes";
import type { OptionalChildren } from "Types/React";
import { PropertyConfigurationTile } from "../PropertyConfigurationTile";

const access = AdminRoutes.addons("PROPERTY_AMENITIES");

export const AmenitiesTile = memo(function AmenitiesTile({
  loading,
  children,
  fetchingIndicator,
}: Props) {
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
      loading={loading}
      fetchingIndicator={fetchingIndicator}
      subtitle="Add an entry for each amenity that can be reserved by your residents">
      {children}
    </PropertyConfigurationTile>
  );
});

interface Props extends OptionalChildren {
  loading?: boolean;
  fetchingIndicator?: boolean;
}
