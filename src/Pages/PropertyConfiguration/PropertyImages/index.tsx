import { memo, useMemo } from "react";
import { ImageGrid } from "Components/ImageGrid";
import { Tile } from "Components/Tile";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import { currentProperty, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { Image } from "./Image";

export const PropertyImages = memo(
  function PropertyImages(_: Propless) {
    const { images } = useProperties(currentProperty);
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
            return <Image key={i} image={image} index={i} />;
          })}
        </ImageGrid>
      </Tile>
    );
  },
  () => true,
);
