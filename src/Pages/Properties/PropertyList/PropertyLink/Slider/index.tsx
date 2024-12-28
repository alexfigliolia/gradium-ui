import { memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ImagePlaceholder } from "Components/ImagePlaceholder";
import type { ISliderChild } from "Components/TouchSlider";
import { TouchSlider } from "Components/TouchSlider";
import type { GradiumImage } from "GraphQL/Types";
import { LeftRight } from "Icons/LeftRight";
import { Devices } from "Tools/Devices";
import "./styles.scss";

export const Slider = memo(function Slider({ images }: Props) {
  const slides = useMemo(() => {
    const imageList: ISliderChild[] = [];
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
      <TouchSlider className={classes} images={slides}>
        {!Devices.IS_MOBILE_BROWSER && <LeftRight aria-hidden />}
      </TouchSlider>
    );
  }

  return <ImagePlaceholder />;
});

interface Props {
  images: (GradiumImage | undefined)[];
}
