import { memo } from "react";
import type { IScreen } from "@figliolia/galena-window";
import { useScreen } from "State/Screen";
import { SpaceCarousel } from "./Carousel";
import { Grid } from "./Grid";

const renderCarousel = (state: IScreen) => state.width < 670;

export const SpaceImages = memo(function SpaceImages({ images }: Props) {
  const carousel = useScreen(renderCarousel);

  if (carousel) {
    return <SpaceCarousel images={images} />;
  }

  return <Grid images={images} />;
});

interface Props {
  images: string[];
}
