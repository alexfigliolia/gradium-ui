import { Fragment, memo } from "react";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { useMinVisible } from "Hooks/useMinVisible";
import type { Callback } from "Types/Generics";

export const AttachmentGrid = memo(function AttachmentGrid({
  type,
  entityId,
  minVisible,
  images,
  onUpload,
  onDelete,
}: Props) {
  const visibleCells = useMinVisible(images.length, minVisible);
  return (
    <Fragment>
      {visibleCells.map((_, i) => (
        <CloudinaryImageInterface
          key={i}
          type={type}
          image={images[i]}
          entityId={entityId}
          onUpload={onUpload}
          onDelete={onDelete}
        />
      ))}
    </Fragment>
  );
});

interface Props {
  entityId: number;
  minVisible: number;
  type: GradiumImageType;
  images: GradiumImage[];
  onUpload: Callback<[GradiumImage]>;
  onDelete: Callback<[GradiumImage]>;
}
