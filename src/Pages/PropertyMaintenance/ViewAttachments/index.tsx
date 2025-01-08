import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { AttachmentGrid } from "Components/AttachmentGrid";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import type { Callback } from "Types/Generics";

export const ViewAttachments = memo(function ViewAttachments({
  id,
  images,
  onClick,
  onUpload,
  imageType,
  className,
}: Props) {
  const clickGenerator = useCallback(
    (...args: Parameters<OnImageClick>) => {
      return () => onClick(...args);
    },
    [onClick],
  );

  const classes = useClassNames("attachments", className);

  return (
    <div className={classes}>
      <AttachmentGrid
        minVisible={1}
        images={images}
        renderItem={(_, i) => {
          const image = images[i];
          if (image) {
            const onClick = clickGenerator(image, i);
            return (
              <button key={i} onClick={onClick}>
                <CloudinaryImageInterface
                  entityId={id}
                  image={image}
                  type={imageType}
                />
              </button>
            );
          }
          return (
            <CloudinaryImageInterface
              key={i}
              entityId={id}
              onUpload={onUpload}
              type={imageType}
            />
          );
        }}
      />
    </div>
  );
});

interface Props {
  id: number;
  className?: string;
  images: GradiumImage[];
  onClick: OnImageClick;
  onUpload: Callback<[GradiumImage]>;
  imageType: GradiumImageType;
}

type OnImageClick = Callback<[image: GradiumImage, index: number]>;
