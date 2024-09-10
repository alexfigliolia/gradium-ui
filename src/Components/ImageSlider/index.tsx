import type { HTMLAttributes, ReactPortal } from "react";
import { memo, useCallback, useLayoutEffect, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController, useUnmount } from "@figliolia/react-hooks";
import type { OptionalChildren } from "Types/React";
import { Controller, type FlickityOptions, type IImage } from "./Controller";
import "./styles.scss";

export const DEFAULT_OPTIONS: FlickityOptions = {
  draggable: true,
  prevNextButtons: false,
  pageDots: false,
  setGallerySize: false,
};

export const ImageSlider = memo(function ImageSlider({
  images,
  children,
  className,
  options = DEFAULT_OPTIONS,
  ...rest
}: Props) {
  const classes = useClassNames("image-slider", className);
  const [portal, setPortal] = useState<ReactPortal | null>(null);
  const controller = useController(
    new Controller(Math.min(images.length - 1, options.initialIndex || 0)),
  );

  const renderPortal = useCallback(() => {
    if (!controller.slider) {
      return;
    }
    setPortal(controller.create(images));
  }, [images, controller]);

  useLayoutEffect(() => {
    controller.setup(options);
    renderPortal();
    return () => {
      controller.destroy();
    };
  }, [options, renderPortal, controller]);

  useUnmount(() => {
    controller.destroy();
  });

  return (
    <div ref={controller.register} className={classes} {...rest}>
      {portal}
      {children}
    </div>
  );
});

interface Props extends HTMLAttributes<HTMLDivElement>, OptionalChildren {
  images: IImage[];
  options?: FlickityOptions;
}

export { Controller } from "./Controller";

export type { IImage, FlickityOptions } from "./Controller";
