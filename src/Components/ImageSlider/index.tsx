import type { Options } from "flickity";
import Flickity from "flickity";
import type { HTMLAttributes } from "react";
import { memo, useLayoutEffect, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

const DEFAULT_OPTIONS: Options = {
  draggable: true,
  prevNextButtons: false,
  pageDots: false,
  setGallerySize: false,
};

export const ImageSlider = memo(function ImageSlider({
  images,
  className,
  options = DEFAULT_OPTIONS,
  ...rest
}: Props) {
  const slider = useRef<Flickity>();
  const container = useRef<HTMLDivElement>(null);
  const classes = useClassNames("image-slider", className);
  useLayoutEffect(() => {
    if (!container.current) {
      return;
    }
    slider.current = new Flickity(container.current, options);
    return () => {
      if (slider.current) {
        slider.current.destroy();
      }
    };
  }, [options, images]);
  return (
    <div ref={container} className={classes} {...rest}>
      {images.map(image => {
        return (
          <div key={image} className="is-slide">
            <picture key={image}>
              <source srcSet={image} />
              <img src={image} alt="Property" />
            </picture>
          </div>
        );
      })}
    </div>
  );
});

interface Props extends HTMLAttributes<HTMLDivElement> {
  images: string[];
  options?: Options;
}
