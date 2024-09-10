import { memo, useCallback, useMemo } from "react";
import { ImageGrid } from "Components/ImageGrid";
import { Tile } from "Components/Tile";
import { UploaderWithPlaceholder } from "Components/UploaderWithPlaceholder";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";

export const PropertyImages = memo(function PropertyImages({ images }: Props) {
  const imageList = useMemo(
    () => Array.from({ length: 6 }, (_, i) => images[i] ?? ""),
    [images],
  );

  const onUpload = useCallback(() => {
    // submit files
  }, []);

  return (
    <Tile TagName="form" className="property-images">
      <h2>
        <ImagePlaceholder /> Images
      </h2>
      <p>These images will help your staff distinguish your properties</p>
      <ImageGrid>
        {imageList.map((image, i) => {
          return (
            <UploaderWithPlaceholder
              key={i}
              image={image}
              onUpload={onUpload}
            />
          );
        })}
      </ImageGrid>
    </Tile>
  );
});

interface Props {
  images: string[];
}
