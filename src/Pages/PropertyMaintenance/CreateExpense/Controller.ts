import { createExpense } from "GraphQL/Mutations/createExpense.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  CreateExpenseMutation,
  CreateExpenseMutationVariables,
  Expense,
} from "GraphQL/Types";
import { GradiumImageType } from "GraphQL/Types";
import { ManagementTasks } from "State/ManagementTasks";
import { Toasts } from "State/Toasts";
import { CreateMaintentanceItemController } from "../BaseControllers";
import type { Controller as InputController, IState } from "../ExpenseViewer";

export class Controller extends CreateMaintentanceItemController<
  IState,
  Expense,
  InputController
> {
  public imageType = GradiumImageType.ExpenseAttachment;
  public async saveData(expense: ReturnType<InputController["toGQL"]>) {
    try {
      const response = await graphQLRequest<
        CreateExpenseMutation,
        CreateExpenseMutationVariables
      >(createExpense, {
        ...expense,
        taskId: ManagementTasks.getState().scopedTask.id,
      });
      return response.createExpense;
    } catch (error) {
      Toasts.error(
        "Something went wrong while creating your expense. Please try again",
      );
    }
  }
}
