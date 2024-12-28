import { StackModel } from "Generics/StackModel";
import { listManagementTasks } from "GraphQL/Queries/listManagementTasks.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  ListManagementTasksQuery,
  ListManagementTasksQueryVariables,
  ManagementTask,
} from "GraphQL/Types";
import { ManagementTaskPriority, ManagementTaskStatus } from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { IManagementTasks, SortedTasks } from "./types";

export class ManagementTaskModel extends StackModel<IManagementTasks> {
  constructor() {
    super("Management Tasks", {
      editing: false,
      creating: false,
      tasks: ManagementTaskModel.EMPTY_TABLE(),
      editableTask: ManagementTaskModel.EMPTY_TASK,
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

  public push(task: ManagementTask) {
    this.update(state => {
      const { id, status } = task;
      state.tasks = {
        ...state.tasks,
        [status]: {
          ...state.tasks[status],
          [id]: task,
        },
      };
    });
  }

  private static EMPTY_TABLE(): SortedTasks {
    return {
      [ManagementTaskStatus.Todo]: {},
      [ManagementTaskStatus.InProgress]: {},
      [ManagementTaskStatus.UnderReview]: {},
      [ManagementTaskStatus.Complete]: {},
    };
  }

  private static readonly EMPTY_TASK: ManagementTask = {
    id: -1,
    createdAt: new Date().toISOString(),
    createdBy: {
      id: -1,
      name: "",
    },
    title: "",
    description: "",
    expenses: [],
    images: [],
    priority: ManagementTaskPriority.Low,
    status: ManagementTaskStatus.Todo,
  };

  private openCreate = this.toggleKey("creating", true);
  private closeCreate = this.toggleKey("creating", false);

  private openEdit = this.toggleKey("editing", true);
  private closeEdit = this.toggleKey("editing", false);

  public createTask = this.createToggle(this.openCreate, this.closeCreate);
  public editTask = this.createToggle(this.openEdit, this.closeEdit);
}
