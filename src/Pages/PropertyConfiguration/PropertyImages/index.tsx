import type { ChangeEvent } from "react";
import { memo, useCallback, useRef } from "react";
import { Tile } from "Components/Tile";
import { Uploader } from "Components/Uploader";
import { EntityUploader } from "Components/UploaderGrid";
import { type GradiumImage, GradiumImageType } from "GraphQL/Types";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import { currentProperty, Properties, useProperties } from "State/Properties";
import type { Callback } from "Types/Generics";
import type { Propless } from "Types/React";
import { useMinSlots } from "./useMinSlots";
import "./styles.scss";

export const PropertyImages = memo(
  function PropertyImages(_: Propless) {
    const minVisible = useMinSlots();
    const { id, images } = useProperties(currentProperty);
    const pushFile = useRef<Callback<[ChangeEvent<HTMLInputElement>]>>(null);

    const uploadFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      pushFile.current?.(e);
    }, []);

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
        <Uploader multiple accept="image/*" onChange={uploadFile}>
          Upload Photos
        </Uploader>
        <EntityUploader
          type="image"
          entityId={id}
          files={images}
          min={minVisible}
          onDelete={onDelete}
          onUpload={onUpload}
          uploadFile={pushFile}
          className="attachment-list"
          fileType={GradiumImageType.PropertyImage}
        />
      </Tile>
    );
  },
  () => true,
);
