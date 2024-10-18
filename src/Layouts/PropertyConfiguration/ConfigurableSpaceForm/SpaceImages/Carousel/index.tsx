import { memo, useMemo } from "react";
import type { FlickityOptions } from "Components/ImageSlider";
import { DEFAULT_OPTIONS, ImageSlider } from "Components/ImageSlider";
import type { GradiumImage } from "GraphQL/Types";
import { selectWidth, useScreen } from "State/Screen";
import { Controller } from "../Controller";
import "./styles.scss";

const OPTIONS: FlickityOptions = {
  ...DEFAULT_OPTIONS,
  contain: true,
  cellAlign: "left",
  setGallerySize: true,
  adaptiveHeight: true,
  percentPosition: true,
};

export const SpaceCarousel = memo(function SpaceCarousel({ images }: Props) {
  const width = useScreen(selectWidth);
  const slides = useMemo(
    () => [
      ...Controller.toRenderableList(images),
      ...Controller.fillCarousel(width, images.length),
    ],
    [width, images],
  );
  return (
    <ImageSlider options={OPTIONS} images={slides} className="space-carousel" />
  );
});

interface Props {
  images: GradiumImage[];
}
