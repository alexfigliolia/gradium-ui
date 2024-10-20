import { memo } from "react";
import { ConfirmDeleteConfigurableSpace } from "Layouts/PropertyConfiguration";
import { Amenities, selectDeletion, useAmenities } from "State/Amenities";
import type { Propless } from "Types/React";

export const ConfirmDelete = memo(
  function ConfirmDelete(_: Propless) {
    const [id, name] = useAmenities(selectDeletion);
    return (
      <ConfirmDeleteConfigurableSpace
        id={id}
        name={name}
        type="amenity"
        model={Amenities}
      />
    );
  },
  () => true,
);
