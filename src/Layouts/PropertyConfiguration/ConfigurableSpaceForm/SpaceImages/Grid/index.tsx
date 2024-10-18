import { memo, useMemo } from "react";
import { ImageGrid } from "Components/ImageGrid";
import type { GradiumImage } from "GraphQL/Types";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import { selectWidth, useScreen } from "State/Screen";
import { Controller } from "../Controller";
import "./styles.scss";

export const Grid = memo(function Grid({ images }: Props) {
  const width = useScreen(selectWidth);
  const fill = useMemo(
    () => Controller.fillGrid(width, images.length),
    [width, images.length],
  );
  return (
    <ImageGrid className="space-grid">
      {Controller.toRenderableList(images).map(c => c.content)}
      {fill.map((_, i) => {
        return (
          <div className="image-placeholder" key={i}>
            <ImagePlaceholder aria-hidden />
          </div>
        );
      })}
    </ImageGrid>
  );
});

interface Props {
  images: GradiumImage[];
}
