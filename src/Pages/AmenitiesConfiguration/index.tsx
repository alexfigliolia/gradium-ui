import { Fragment, memo, useCallback } from "react";
import { AmenitiesTile } from "Components/AmenitiesTile";
import { PropertyConfigurationPage } from "Layouts/PropertyConfiguration";
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
      <PropertyConfigurationPage labelFN={labelFN}>
        <AmenitiesTile>
          <NewAmenityButton />
        </AmenitiesTile>
        {!!amenities.length && (
          <Fragment>
            {amenities.map((amenity, i) => {
              return <AmenityForm key={i} index={i} {...amenity} />;
            })}
            <NewAmenityButton />
          </Fragment>
        )}
      </PropertyConfigurationPage>
    );
  },
  () => true,
);
