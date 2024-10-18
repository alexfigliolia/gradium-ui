import { Fragment, memo, useCallback } from "react";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import {
  AmenitiesTile,
  PropertyConfigurationPage,
} from "Layouts/PropertyConfiguration";
import { AdminRoutes } from "Router/AdminRoutes";
import { selectAmenities, useAmenities } from "State/Amenities";
import type { Propless } from "Types/React";
import { AmenityForm } from "./AmenityForm";
import { NewAmenityButton } from "./NewAmenityButton";

export default memo(
  function AmenitiesConfiguration(_: Propless) {
    const labelFN = useCallback(
      (property: string) => `Amenities at ${property}`,
      [],
    );
    const amenities = useAmenities(selectAmenities);
    return (
      <PermissedPropertyRoute
        fallback=".."
        requirements={AdminRoutes.access("PROPERTY_AMENITIES")}>
        <PropertyConfigurationPage labelFN={labelFN}>
          <AmenitiesTile>
            <NewAmenityButton />
          </AmenitiesTile>
          {!!amenities.length && (
            <Fragment>
              {amenities.map((amenity, i) => {
                return <AmenityForm key={i} {...amenity} />;
              })}
              <NewAmenityButton />
            </Fragment>
          )}
        </PropertyConfigurationPage>
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
