import { createManagementTask } from "GraphQL/Mutations/createManagementTask.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  CreateManagementTaskMutation,
  CreateManagementTaskMutationVariables,
  ManagementTask,
} from "GraphQL/Types";
import { GradiumImageType } from "GraphQL/Types";
import { Toasts } from "State/Toasts";
import { CreateMaintentanceItemController } from "../BaseControllers";
import type { Controller as InputController, IState } from "../TaskViewer";

export class Controller extends CreateMaintentanceItemController<
  IState,
  ManagementTask,
  InputController
> {
  public imageType = GradiumImageType.TaskImage;

  public async saveData(task: CreateManagementTaskMutationVariables) {
    try {
      const response = await graphQLRequest<
        CreateManagementTaskMutation,
        CreateManagementTaskMutationVariables
      >(createManagementTask, task);
      return response.createManagementTask;
    } catch (error) {
      Toasts.error(
        "Something went wrong while creating your task. Please try again",
      );
    }
  }
}
