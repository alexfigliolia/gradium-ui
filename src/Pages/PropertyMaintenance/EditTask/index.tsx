import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { AttachmentGrid } from "Components/AttachmentGrid";
import { updateManagementTask } from "GraphQL/Mutations/updateManagementTask.gql";
import {
  type CreateManagementTaskMutationVariables,
  type GradiumImage,
  GradiumImageType,
  type UpdateManagementTaskMutation,
  type UpdateManagementTaskMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import {
  editing,
  ManagementTasks,
  selectScopedTask,
  useTasks,
} from "State/ManagementTasks";
import type { Callback } from "Types/Generics";
import type { Propless } from "Types/React";
import { TaskModal } from "../TaskModal";

export const EditTask = memo(function EditTask(_: Propless) {
  const open = useTasks(editing);
  const task = useTasks(selectScopedTask);
  const clearForm = useRef<Callback>(null);
  const [images, setImages] = useState<GradiumImage[]>(task.images);

  const onUpload = useCallback(
    (image: GradiumImage) => {
      const update = [...images, image];
      setImages(update);
      ManagementTasks.partialUpdateByID(task.id, { images: update });
    },
    [task.id, images],
  );

  const onDelete = useCallback(
    (image: GradiumImage) => {
      const update = images.filter(img => img.id !== image.id);
      setImages(update);
      ManagementTasks.partialUpdateByID(task.id, { images: update });
    },
    [task.id, images],
  );

  useEffect(() => {
    setImages(task.images);
  }, [task.images]);

  const updateTask = useCallback(
    async (
      data: CreateManagementTaskMutationVariables,
      setState: ILoadingStateSetter,
    ) => {
      const client = new UIClient({ setState });
      try {
        const response = await client.executeQuery<
          UpdateManagementTaskMutation,
          UpdateManagementTaskMutationVariables
        >(
          updateManagementTask,
          {
            id: task.id,
            ...data,
          },
          () => {
            ManagementTasks.editTask.close();
            clearForm.current?.();
            setImages([]);
          },
        );
        ManagementTasks.updateByID(response.updateManagementTask);
      } catch (e) {
        // silence
      }
    },
    [task.id],
  );

  return (
    <TaskModal
      task={task}
      open={open}
      ref={clearForm}
      title="Edit Task"
      actionText="Update"
      onFormSubmit={updateTask}
      close={ManagementTasks.editTask.close}>
      <AttachmentGrid
        minVisible={3}
        images={images}
        entityId={task.id}
        onUpload={onUpload}
        onDelete={onDelete}
        type={GradiumImageType.TaskImage}
      />
    </TaskModal>
  );
});
