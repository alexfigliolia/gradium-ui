import { memo } from "react";
import type { Amenity } from "GraphQL/Types";
import { ConfigurableSpaceForm } from "Layouts/PropertyConfiguration";
import type { AmenitiesModel } from "Models/Amenities";
import { Amenities } from "State/Amenities";
import { Inputs } from "./Inputs";
import "./styles.scss";

export const AmenityForm = memo(function AmenityForm(amenity: Amenity) {
  return (
    <ConfigurableSpaceForm<Amenity, AmenitiesModel>
      item={amenity}
      model={Amenities}
      spaceDisplayName="Amenity"
      className="amenity-inputs">
      <Inputs />
    </ConfigurableSpaceForm>
  );
});
