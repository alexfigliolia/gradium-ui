import { memo, useCallback, useRef } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { updateManagementTask } from "GraphQL/Mutations/updateManagementTask.gql";
import type {
  CreateManagementTaskMutationVariables,
  UpdateManagementTaskMutation,
  UpdateManagementTaskMutationVariables,
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

  const updateTask = useCallback(
    async (
      data: CreateManagementTaskMutationVariables,
      setState: ILoadingStateSetter,
    ) => {
      const { images: _, ...rest } = data;
      const client = new UIClient({ setState });
      try {
        const response = await client.executeQuery<
          UpdateManagementTaskMutation,
          UpdateManagementTaskMutationVariables
        >(
          updateManagementTask,
          {
            id: task.id,
            ...rest,
          },
          () => {
            ManagementTasks.editTask.close();
            clearForm.current?.();
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
      close={ManagementTasks.editTask.close}
    />
  );
});
