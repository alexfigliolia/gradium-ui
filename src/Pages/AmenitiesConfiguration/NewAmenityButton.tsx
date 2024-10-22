import { memo, useMemo } from "react";
import { GradientTransitionButton } from "Components/GradientTransitionButton";
import {
  Amenities,
  fetching,
  selectAmenities,
  useAmenities,
} from "State/Amenities";
import type { Propless } from "Types/React";

export const NewAmenityButton = memo(
  function NewAmenityButton(_: Propless) {
    const loading = useAmenities(fetching);
    const spaces = useAmenities(selectAmenities);

    const createDisabled = useMemo(() => {
      const { length } = spaces;
      return loading || (!!length && !Amenities.validate(spaces[length - 1]));
    }, [spaces, loading]);

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
