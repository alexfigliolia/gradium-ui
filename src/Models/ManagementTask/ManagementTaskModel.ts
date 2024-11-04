import { listManagementTasks } from "GraphQL/Queries/listManagementTasks.gql";
import { graphQLRequest } from "GraphQL/request";
import {
  type ListManagementTasksQuery,
  type ListManagementTasksQueryVariables,
  ManagementTaskStatus,
} from "GraphQL/Types";
import { BaseModel } from "Models/BaseModel";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { IManagementTasks, SortedTasks } from "./types";

export class ManagementTaskModel extends BaseModel<IManagementTasks> {
  constructor() {
    super("Management Tasks", {
      creating: false,
      editing: false,
      editableTask: {},
      tasks: ManagementTaskModel.EMPTY_TABLE(),
    });
  }

  public async fetch() {
    try {
      const response = await graphQLRequest<
        ListManagementTasksQuery,
        ListManagementTasksQueryVariables
      >(listManagementTasks, {
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      const tasks = ManagementTaskModel.EMPTY_TABLE();
      for (const task of response.listManagementTasks) {
        tasks[task.status][task.id] = task;
      }
      this.update(state => {
        state.tasks = tasks;
      });
    } catch (error) {
      Toasts.error(
        "Something went wrong while fetching your maintenance items. Please try again",
      );
    }
  }

  private static EMPTY_TABLE(): SortedTasks {
    return {
      [ManagementTaskStatus.Todo]: {},
      [ManagementTaskStatus.InProgress]: {},
      [ManagementTaskStatus.UnderReview]: {},
      [ManagementTaskStatus.Complete]: {},
    };
  }
}
