import { memo, useMemo } from "react";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import { ImageGrid } from "Components/ImageGrid";
import { Tile } from "Components/Tile";
import type { PropertyImage } from "GraphQL/Types";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";

export const PropertyImages = memo(function PropertyImages({ images }: Props) {
  const imageList = useMemo(
    () => Array.from({ length: 6 }, (_, i) => images?.[i]),
    [images],
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
          return <CloudinaryImageInterface key={i} image={image} />;
        })}
      </ImageGrid>
    </Tile>
  );
});

interface Props {
  images: PropertyImage[];
}
