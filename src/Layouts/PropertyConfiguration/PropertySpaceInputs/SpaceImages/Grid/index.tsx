import { memo, useMemo } from "react";
import { ImageGrid } from "Components/ImageGrid";
import { selectWidth, useScreen } from "State/Screen";
import { Controller } from "../Controller";
import { Fallback } from "../Fallback";
import "./styles.scss";

export const Grid = memo(function Grid({ images }: Props) {
  const width = useScreen(selectWidth);
  const fill = useMemo(
    () => Controller.fillGrid(width, images.length),
    [width, images],
  );
  return (
    <ImageGrid className="space-grid">
      {images.map((image, i) => {
        return (
          <picture key={i} className="grid-image">
            <source srcSet={image} />
            <img src={image} alt="" />
          </picture>
        );
      })}
      {fill.map((_, i) => {
        return <Fallback key={i} />;
      })}
    </ImageGrid>
  );
});

interface Props {
  images: string[];
}
