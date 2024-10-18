import { memo } from "react";
import type { IScreen } from "@figliolia/galena-window";
import type { GradiumImage } from "GraphQL/Types";
import { useScreen } from "State/Screen";
import { SpaceCarousel } from "./Carousel";
import { Grid } from "./Grid";

const renderCarousel = (state: IScreen) => state.width < 670;

export const SpaceImages = memo(function SpaceImages(props: Props) {
  const carousel = useScreen(renderCarousel);

  if (carousel) {
    return <SpaceCarousel {...props} />;
  }

  return <Grid {...props} />;
});

interface Props {
  images: GradiumImage[];
}
