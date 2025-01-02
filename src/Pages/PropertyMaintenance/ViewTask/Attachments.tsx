import { memo, useCallback } from "react";
import { AttachmentGrid } from "Components/AttachmentGrid";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import { type GradiumImage, GradiumImageType } from "GraphQL/Types";
import { ManagementTasks } from "State/ManagementTasks";

export const Attachments = memo(function Attachments({ id, images }: Props) {
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

  return (
    <div className="attachments">
      <AttachmentGrid
        minVisible={1}
        images={images}
        renderItem={(_, i) => {
          if (images[i]) {
            return (
              <button key={i}>
                <CloudinaryImageInterface
                  entityId={id}
                  image={images[i]}
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
}
