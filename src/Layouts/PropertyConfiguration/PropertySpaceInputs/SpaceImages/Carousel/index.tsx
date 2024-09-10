import { memo, useMemo } from "react";
import type { FlickityOptions } from "Components/ImageSlider";
import { DEFAULT_OPTIONS, ImageSlider } from "Components/ImageSlider";
import { selectWidth, useScreen } from "State/Screen";
import { Controller } from "../Controller";
import "./styles.scss";

const OPTIONS: FlickityOptions = {
  ...DEFAULT_OPTIONS,
  cellAlign: "left",
  contain: true,
  setGallerySize: true,
  adaptiveHeight: true,
  percentPosition: true,
};

export const SpaceCarousel = memo(function SpaceCarousel({ images }: Props) {
  const width = useScreen(selectWidth);
  const slides = useMemo(
    () => [
      ...Controller.transform(images),
      ...Controller.fillCarousel(width, images.length),
    ],
    [width, images],
  );
  return (
    <ImageSlider options={OPTIONS} images={slides} className="space-carousel" />
  );
});

interface Props {
  images: string[];
}
