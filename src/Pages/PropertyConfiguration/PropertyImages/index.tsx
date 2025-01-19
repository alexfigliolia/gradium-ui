import { memo, useCallback } from "react";
import { Tile } from "Components/Tile";
import { EntityUploader } from "Components/UploaderGrid";
import { type GradiumImage, GradiumImageType } from "GraphQL/Types";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import { currentProperty, Properties, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { useMinSlots } from "./useMinSlots";
import "./styles.scss";

export const PropertyImages = memo(
  function PropertyImages(_: Propless) {
    const minVisible = useMinSlots();
    const { id, images } = useProperties(currentProperty);

    const onUpload = useCallback(
      (image: GradiumImage) => {
        Properties.addImage(id, image);
      },
      [id],
    );

    const onDelete = useCallback(
      (image: GradiumImage) => {
        Properties.deleteImage(id, image);
      },
      [id],
    );

    return (
      <Tile className="property-images">
        <h2>
          <ImagePlaceholder /> Images
        </h2>
        <p>
          These images will help your staff and residents distinguish your
          properties
        </p>
        <EntityUploader
          entityId={id}
          images={images}
          min={minVisible}
          onDelete={onDelete}
          onUpload={onUpload}
          className="attachment-list"
          imageType={GradiumImageType.PropertyImage}
        />
      </Tile>
    );
  },
  () => true,
);
