import { memo, useMemo } from "react";
import { GradientTransitionButton } from "Components/GradientTransitionButton";
import { Amenities, selectAmenities, useAmenities } from "State/Amenities";
import type { Propless } from "Types/React";

export const NewAmenityButton = memo(
  function NewAmenityButton(_: Propless) {
    const spaces = useAmenities(selectAmenities);

    const createDisabled = useMemo(() => {
      const { length } = spaces;
      return !!length && !Amenities.validate(spaces[length - 1]);
    }, [spaces]);

    return (
      <GradientTransitionButton
        type="button"
        label="New Amenity"
        disabled={createDisabled}
        onClick={Amenities.create}
      />
    );
  },
  () => true,
);
