import { memo, useCallback, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useDebouncer } from "@figliolia/react-hooks";
import { updateManagementTask } from "GraphQL/Mutations/updateManagementTask.gql";
import {
  type GradiumImage,
  GradiumImageType,
  type UpdateManagementTaskMutation,
  type UpdateManagementTaskMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import {
  ManagementTasks,
  selectScopedTask,
  useTasks,
  viewing,
} from "State/ManagementTasks";
import type { Propless } from "Types/React";
import { AttachmentList } from "../AttachmentList";
import { DeleteButton } from "../DeleteButton";
import type { Controller as InputController, IState } from "../TaskViewer";
import { TaskViewer } from "../TaskViewer";
import { Expenses } from "./Expenses";

export const ViewTask = memo(
  function ViewTask(_: Propless) {
    const open = useTasks(viewing);
    const task = useTasks(selectScopedTask);
    const [viewerOpen, setViewerOpen] = useState(false);
    const inputController = useRef<InputController>(null);

    const updateTask = useDebouncer(async (state: IState) => {
      if (!inputController.current) {
        return;
      }
      try {
        const client = new UIClient({ setState: () => {} });
        const result = await client.executeQuery<
          UpdateManagementTaskMutation,
          UpdateManagementTaskMutationVariables
        >(updateManagementTask, {
          id: task.id,
          ...inputController.current.toGQL(state),
        });
        ManagementTasks.updateByID(result.updateManagementTask, false);
      } catch (error) {
        // silence
      }
    }, 500);

    const onUploadImage = useCallback(
      (image: GradiumImage) => {
        ManagementTasks.partialUpdateByID(task.id, {
          images: [...task.images, image],
        });
      },
      [task.id, task.images],
    );

    const onDeleteImage = useCallback(
      (image: GradiumImage) => {
        ManagementTasks.partialUpdateByID(task.id, {
          images: task.images.filter(img => image.id !== img.id),
        });
      },
      [task.id, task.images],
    );

    const classes = useClassNames({ "viewer-open": viewerOpen });

    return (
      <TaskViewer
        open={open}
        className={classes}
        ref={inputController}
        onUpdate={updateTask.execute}
        close={ManagementTasks.viewTask.close}>
        <AttachmentList
          entityId={task.id}
          images={task.images}
          onToggle={setViewerOpen}
          onUpload={onUploadImage}
          onDelete={onDeleteImage}
          imageType={GradiumImageType.TaskImage}
        />
        <Expenses expenses={task.expenses} />
        <DeleteButton
          text="Delete Task"
          onClick={ManagementTasks.deleteTask.open}
        />
      </TaskViewer>
    );
  },
  () => true,
);
