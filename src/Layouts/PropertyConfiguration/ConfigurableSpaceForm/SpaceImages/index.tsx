import { memo, useContext, useMemo } from "react";
import { ImageGrid } from "Components/ImageGrid";
import { selectWidth, useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import { CSFContext } from "../Context";
import { Controller } from "./Controller";
import { Image } from "./Image";
import "./styles.scss";

export const SpaceImages = memo(
  function SpaceImages(_: Propless) {
    const width = useScreen(selectWidth);
    const {
      model,
      item: { images, floorPlans },
    } = useContext(CSFContext);

    const total = useMemo(
      () => images.length + floorPlans.length,
      [images.length, floorPlans.length],
    );

    const fill = useMemo(
      () => Controller.fillGrid(width, total),
      [width, total],
    );

    return (
      <ImageGrid className="space-grid">
        {images.map((image, i) => {
          return <Image key={i} image={image} type={model.IMAGE_TYPE} />;
        })}
        {floorPlans.map((image, i) => {
          return <Image key={i} image={image} type={model.FLOOR_PLAN_TYPE} />;
        })}
        {fill.map((_, i) => {
          return <Image key={i} image={undefined} type={model.IMAGE_TYPE} />;
        })}
      </ImageGrid>
    );
  },
  () => true,
);
