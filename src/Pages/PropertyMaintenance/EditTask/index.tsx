import { memo, useCallback, useRef } from "react";
import { type ILoadingStateSetter, useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { AttachmentGrid } from "Components/AttachmentGrid";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import { Confirmation } from "Components/Confirmation";
import { updateManagementTask } from "GraphQL/Mutations/updateManagementTask.gql";
import type {
  GradiumImage,
  UpdateManagementTaskMutation,
  UpdateManagementTaskMutationVariables,
} from "GraphQL/Types";
import { GradiumImageType } from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import {
  editing,
  ManagementTasks,
  selectScopedTask,
  useTasks,
} from "State/ManagementTasks";
import type { Propless } from "Types/React";
import type { InputController } from "../TaskInputs";
import { TaskInputs } from "../TaskInputs";
import "./styles.scss";

export const EditTask = memo(
  function EditTask(_: Propless) {
    const open = useTasks(editing);
    const task = useTasks(selectScopedTask);
    const form = useRef<HTMLFormElement>(null);
    const inputController = useRef<InputController>(null);

    const updateTask = useCallback(
      async (_: FormData, setState: ILoadingStateSetter) => {
        if (!inputController.current) {
          return;
        }
        const { getState, controller } = inputController.current;
        try {
          const client = new UIClient({ setState });
          const response = await client.executeQuery<
            UpdateManagementTaskMutation,
            UpdateManagementTaskMutationVariables
          >(
            updateManagementTask,
            {
              id: task.id,
              ...controller.toGQL(getState()),
            },
            () => {
              ManagementTasks.editTask.close();
            },
          );
          ManagementTasks.updateByID(response.updateManagementTask);
        } catch (error) {
          // silence
        }
      },
      [task],
    );

    const { loading, success, error, onSubmit } = useFormState(updateTask);

    const onUpload = useCallback(
      (image: GradiumImage) => {
        ManagementTasks.partialUpdateByID(task.id, {
          images: [...task.images, image],
        });
      },
      [task],
    );

    const onDelete = useCallback(
      (image: GradiumImage) => {
        ManagementTasks.partialUpdateByID(task.id, {
          images: task.images.filter(img => img.id !== image.id),
        });
      },
      [task],
    );

    return (
      <Confirmation
        open={open}
        className="edit-management-task"
        close={ManagementTasks.editTask.close}>
        <h2>Edit Task</h2>
        <form ref={form} onSubmit={onSubmit}>
          <TaskInputs task={task} ref={inputController}>
            <AttachmentGrid
              minVisible={3}
              images={task.images}
              renderItem={(_, i) => (
                <CloudinaryImageInterface
                  entityId={task.id}
                  image={task.images[i]}
                  onUpload={onUpload}
                  onDelete={onDelete}
                  type={GradiumImageType.TaskImage}
                />
              )}
            />
          </TaskInputs>
          <ActionButton
            type="submit"
            error={!!error}
            success={success}
            loading={loading}>
            Update
          </ActionButton>
        </form>
      </Confirmation>
    );
  },
  () => true,
);
