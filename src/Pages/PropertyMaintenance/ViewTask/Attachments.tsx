import { memo, useCallback } from "react";
import { AttachmentGrid } from "Components/AttachmentGrid";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import { type GradiumImage, GradiumImageType } from "GraphQL/Types";
import { ManagementTasks } from "State/ManagementTasks";
import type { Callback } from "Types/Generics";

export const Attachments = memo(function Attachments({
  id,
  images,
  onClick,
}: Props) {
  const onUpload = useCallback(
    (image: GradiumImage) => {
      const task = ManagementTasks.getByID(id);
      if (task) {
        ManagementTasks.partialUpdateByID(id, {
          images: [...task.images, image],
        });
      }
    },
    [id],
  );

  const clickGenerator = useCallback(
    (...args: Parameters<OnImageClick>) => {
      return () => onClick(...args);
    },
    [onClick],
  );

  return (
    <div className="attachments">
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
                  type={GradiumImageType.TaskImage}
                />
              </button>
            );
          }
          return (
            <CloudinaryImageInterface
              key={i}
              entityId={id}
              onUpload={onUpload}
              type={GradiumImageType.TaskImage}
            />
          );
        }}
      />
    </div>
  );
});

interface Props {
  id: number;
  images: GradiumImage[];
  onClick: OnImageClick;
}

type OnImageClick = Callback<[image: GradiumImage, index: number]>;
