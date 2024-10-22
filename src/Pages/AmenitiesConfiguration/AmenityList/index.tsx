import { Fragment, memo } from "react";
import { fetching, selectAmenities, useAmenities } from "State/Amenities";
import type { Propless } from "Types/React";
import { NewAmenityButton } from "../NewAmenityButton";
import { AmenityForm } from "./AmenityForm";
import { AmenitySkeleton } from "./AmenitySkeleton";

export const AmenityList = memo(
  function AmenityList(_: Propless) {
    const loading = useAmenities(fetching);
    const amenities = useAmenities(selectAmenities);
    if (loading) {
      return <AmenitySkeleton />;
    }
    if (!amenities.length) {
      return null;
    }
    return (
      <Fragment>
        {amenities.map((space, i) => {
          return <AmenityForm key={i} {...space} />;
        })}
        <NewAmenityButton />
      </Fragment>
    );
  },
  () => true,
);
