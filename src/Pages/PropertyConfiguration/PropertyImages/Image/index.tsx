import { memo, useCallback } from "react";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import { type GradiumImage, GradiumImageType } from "GraphQL/Types";
import { currentId, Properties, useProperties } from "State/Properties";

export const Image = memo(function Image({ image, index }: Props) {
  const id = useProperties(currentId);
  const onUpload = useCallback(
    (image: GradiumImage) => {
      Properties.addImage(image, index);
    },
    [index],
  );
  const onDelete = useCallback(
    (image: GradiumImage) => {
      Properties.deleteImage(image, index);
    },
    [index],
  );
  return (
    <CloudinaryImageInterface
      entityId={id}
      image={image}
      onUpload={onUpload}
      onDelete={onDelete}
      type={GradiumImageType.PropertyImage}
    />
  );
});

interface Props {
  index: number;
  image?: GradiumImage;
}
