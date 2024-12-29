import { memo, useCallback, useRef } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { createManagementTask } from "GraphQL/Mutations/createManagementTask.gql";
import type {
  CreateManagementTaskMutation,
  CreateManagementTaskMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { creating, ManagementTasks, useTasks } from "State/ManagementTasks";
import type { Callback } from "Types/Generics";
import type { Propless } from "Types/React";
import { TaskModal } from "../TaskModal";

export const CreateTask = memo(function CreateTask(_: Propless) {
  const open = useTasks(creating);
  const clearForm = useRef<Callback>(null);

  const createTask = useCallback(
    async (
      data: CreateManagementTaskMutationVariables,
      setState: ILoadingStateSetter,
    ) => {
      const client = new UIClient({ setState });
      try {
        const response = await client.executeQuery<
          CreateManagementTaskMutation,
          CreateManagementTaskMutationVariables
        >(createManagementTask, data, () => {
          ManagementTasks.createTask.close();
          clearForm.current?.();
        });
        ManagementTasks.push(response.createManagementTask);
      } catch (e) {
        // silence
      }
    },
    [],
  );

  return (
    <TaskModal
      open={open}
      ref={clearForm}
      title="Create Task"
      actionText="Create"
      onFormSubmit={createTask}
      close={ManagementTasks.createTask.close}
    />
  );
});
