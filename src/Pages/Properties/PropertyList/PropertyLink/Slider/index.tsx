import { memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { IImage } from "Components/ImageSlider";
import { ImageSlider } from "Components/ImageSlider";
import type { GradiumImage } from "GraphQL/Types";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import { LeftRight } from "Icons/LeftRight";
import { Devices } from "Tools/Devices";
import "./styles.scss";

export const Slider = memo(function Slider({ images }: Props) {
  const slides = useMemo(() => {
    const imageList: IImage[] = [];
    for (const image of images) {
      if (image) {
        imageList.push({ type: "image", content: image.url });
      }
    }
    return imageList;
  }, [images]);

  const classes = useClassNames("p-link-slider", {
    "is-desktop": !Devices.IS_MOBILE_BROWSER,
  });

  if (images.length) {
    return (
      <ImageSlider className={classes} images={slides}>
        {!Devices.IS_MOBILE_BROWSER && <LeftRight aria-hidden />}
      </ImageSlider>
    );
  }

  return (
    <div className="placeholder">
      <ImagePlaceholder />
    </div>
  );
});

interface Props {
  images: (GradiumImage | undefined)[];
}
