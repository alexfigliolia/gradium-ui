import { memo, useCallback } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { deleteExpense } from "GraphQL/Mutations/deleteExpense.gql";
import type {
  DeleteExpenseMutation,
  DeleteExpenseMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import {
  deletingExpense,
  ManagementTasks,
  selectScopedExpense,
  selectScopedTask,
  useTasks,
} from "State/ManagementTasks";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import { ConfirmDelete } from "../ConfirmDelete";

export const ConfirmDeleteExpense = memo(
  function ConfirmDeleteExpense(_: Propless) {
    const open = useTasks(deletingExpense);
    const task = useTasks(selectScopedTask);
    const expense = useTasks(selectScopedExpense);

    const deleteScopedExpense = useCallback(
      (setState: ILoadingStateSetter) => {
        const client = new UIClient({
          setState,
          successMessage: "Your expense has been deleted",
        });
        void client.executeQuery<
          DeleteExpenseMutation,
          DeleteExpenseMutationVariables
        >(
          deleteExpense,
          {
            id: expense.id,
            propertyId: Properties.getState().current,
            organizationId: Scope.getState().currentOrganizationId,
          },
          () => {
            ManagementTasks.deleteExpense.close();
            ManagementTasks.viewExpense.close();
            ManagementTasks.updateByID({
              ...task,
              expenses: task.expenses.filter(exp => exp.id !== expense.id),
            });
          },
        );
      },
      [task, expense.id],
    );

    return (
      <ConfirmDelete
        open={open}
        title="Are you sure?"
        onConfirm={deleteScopedExpense}
        description="By deleting this expense, it's cost will be removed from your property's accounting"
        close={ManagementTasks.deleteExpense.close}
      />
    );
  },
  () => true,
);
