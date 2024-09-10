import { Fragment, memo } from "react";
import { BasketballCourt } from "Icons/BasketballCourt";
import { PropertyConfigurationTile } from "Layouts/PropertyConfiguration";
import type { OptionalChildren } from "Types/React";

export const AmenitiesTile = memo(function AmenitiesTile({
  children,
}: OptionalChildren) {
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
