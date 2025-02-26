import { memo, useCallback } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { deleteManagementTask } from "GraphQL/Mutations/deleteManagementTask.gql";
import type {
  DeleteAmenityMutationVariables,
  DeleteManagementTaskMutation,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import {
  deleting,
  ManagementTasks,
  selectScopedTask,
  useTasks,
} from "State/ManagementTasks";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import { ConfirmDelete } from "../ConfirmDelete";

export const ConfirmDeleteTask = memo(
  function ConfirmDeleteTask(_: Propless) {
    const open = useTasks(deleting);
    const task = useTasks(selectScopedTask);

    const deleteTask = useCallback(
      (setState: ILoadingStateSetter) => {
        const client = new UIClient({
          setState,
          successMessage: "Your task has been deleted",
        });
        void client.executeQuery<
          DeleteManagementTaskMutation,
          DeleteAmenityMutationVariables
        >(
          deleteManagementTask,
          {
            id: task.id,
            propertyId: Properties.getState().current,
            organizationId: Scope.getState().currentOrganizationId,
          },
          () => {
            ManagementTasks.deleteTask.close();
            ManagementTasks.viewTask.close();
            ManagementTasks.deleteByID(task.id);
          },
        );
      },
      [task.id],
    );

    return (
      <ConfirmDelete
        open={open}
        title="Are you sure?"
        onConfirm={deleteTask}
        description="By deleting this task all related expenses will be deleted as well."
        close={ManagementTasks.deleteTask.close}
      />
    );
  },
  () => true,
);
