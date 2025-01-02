import { memo, useCallback } from "react";
import { useLoadingState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { GradientButton } from "Components/GradientButton";
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
import "./styles.scss";

export const ConfirmDelete = memo(
  function ConfirmDelete(_: Propless) {
    const open = useTasks(deleting);
    const task = useTasks(selectScopedTask);
    const { loading, success, error, setState } = useLoadingState();

    const deleteTask = useCallback(() => {
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
    }, [setState, task.id]);

    return (
      <Confirmation
        open={open}
        className="delete-maintentance-task"
        close={ManagementTasks.deleteTask.close}>
        <h2>Are you sure?</h2>
        <p>This action cannot be undone.</p>
        <div className="actions">
          <GradientButton
            className="delete"
            onClick={ManagementTasks.deleteTask.close}>
            Cancel
          </GradientButton>
          <ActionButton
            onClick={deleteTask}
            error={!!error}
            success={success}
            loading={loading}>
            Confirm
          </ActionButton>
        </div>
      </Confirmation>
    );
  },
  () => true,
);
