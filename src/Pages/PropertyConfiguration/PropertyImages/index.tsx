import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useController } from "@figliolia/react-hooks";
import { ImageGrid } from "Components/ImageGrid";
import { Tile } from "Components/Tile";
import { UploaderWithPlaceholder } from "Components/UploaderWithPlaceholder";
import type { PropertyImage } from "GraphQL/Types";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import { Controller } from "./Controller";

export const PropertyImages = memo(function PropertyImages({ images }: Props) {
  const imageList = useMemo(
    () => Array.from({ length: 6 }, (_, i) => images?.[i]?.url ?? ""),
    [images],
  );

  const controller = useController(new Controller());

  const onUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      void controller.Uploader.onUpload(e);
    },
    [controller],
  );

  const deleteImage = useCallback(
    (index: number) => {
      return () => {
        void controller.Deleter.delete(index);
      };
    },
    [controller],
  );

  return (
    <Tile TagName="form" className="property-images">
      <h2>
        <ImagePlaceholder /> Images
      </h2>
      <p>
        These images will help your staff and residents distinguish your
        properties
      </p>
      <ImageGrid>
        {imageList.map((image, i) => {
          return (
            <UploaderWithPlaceholder
              key={i}
              image={image}
              onUpload={onUpload}
              onCloserClick={deleteImage(i)}
            />
          );
        })}
      </ImageGrid>
    </Tile>
  );
});

interface Props {
  images: PropertyImage[];
}
