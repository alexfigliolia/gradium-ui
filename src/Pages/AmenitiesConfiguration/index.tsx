import { memo, useCallback } from "react";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import {
  AmenitiesTile,
  PropertyConfigurationPage,
} from "Layouts/PropertyConfiguration";
import { AdminRoutes } from "Router/AdminRoutes";
import { fetching, useAmenities } from "State/Amenities";
import type { Propless } from "Types/React";
import { AmenityList } from "./AmenityList";
import { ConfirmDelete } from "./ConfirmDelete";
import { NewAmenityButton } from "./NewAmenityButton";

export default memo(
  function AmenitiesConfiguration(_: Propless) {
    const labelFN = useCallback(
      (property: string) => `Amenities at ${property}`,
      [],
    );
    const loading = useAmenities(fetching);
    return (
      <PermissedPropertyRoute
        fallback=".."
        requirements={AdminRoutes.access("PROPERTY_AMENITIES")}>
        <PropertyConfigurationPage labelFN={labelFN}>
          <AmenitiesTile loading={loading} fetchingIndicator>
            <NewAmenityButton />
          </AmenitiesTile>
          <AmenityList />
        </PropertyConfigurationPage>
        <ConfirmDelete />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
