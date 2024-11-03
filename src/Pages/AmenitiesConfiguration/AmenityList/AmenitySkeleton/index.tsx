import { memo } from "react";
import { HeaderSkeleton, InputSkeleton } from "Components/Skeletons";
import { FormSkeleton } from "Layouts/PropertyConfiguration";
import type { Propless } from "Types/React";

export const AmenitySkeleton = memo(
  function AmenitySkeleton(_: Propless) {
    return (
      <FormSkeleton title="New Amenity" inputGroupClassName="amenity-inputs">
        <InputSkeleton className="name-input" />
        <InputSkeleton className="number size-input" />
        <HeaderSkeleton Tag="h4">Hours of Operation</HeaderSkeleton>
        <InputSkeleton className="dropdown" />
        <InputSkeleton className="dropdown" />
        <HeaderSkeleton Tag="h4">Reservation Pricing</HeaderSkeleton>
        <InputSkeleton className="number price-input" />
        <InputSkeleton className="dropdown" />
      </FormSkeleton>
    );
  },
  () => true,
);
