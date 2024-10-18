import { memo, useCallback } from "react";
import {
  ConfigurableSpaceForm,
  type Controller,
} from "Layouts/PropertyConfiguration";
import type { AmenitiesModel, IAmenity } from "Models/Amenities";
import { Amenities } from "State/Amenities";
import { Inputs } from "./Inputs";
import "./styles.scss";

export const AmenityForm = memo(function AmenityForm(amenity: IAmenity) {
  const render = useCallback(
    (controller: Controller<IAmenity, AmenitiesModel>, editing: boolean) => {
      return <Inputs {...amenity} controller={controller} editing={editing} />;
    },
    [amenity],
  );

  return (
    <ConfigurableSpaceForm<IAmenity, AmenitiesModel>
      {...amenity}
      render={render}
      model={Amenities}
      spaceDisplayName="Amenity"
      className="amenity-inputs"
    />
  );
});
