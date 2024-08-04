import Flickity from "flickity";
import type { HTMLAttributes } from "react";
import { memo, useEffect, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const ImageSlider = memo(function ImageSlider({
  images,
  className,
}: Props) {
  const slider = useRef<Flickity>();
  const container = useRef<HTMLDivElement>(null);
  const classes = useClassNames("image-slider", className);
  useEffect(() => {
    if (!container.current) {
      return;
    }
    slider.current = new Flickity(container.current, {
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      adaptiveHeight: true,
      watchCSS: true,
    });
    return () => {
      if (slider.current) {
        slider.current.destroy();
      }
    };
  }, []);
  return (
    <div ref={container} className={classes}>
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
}
