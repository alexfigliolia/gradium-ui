import { Debouncer } from "@figliolia/react-hooks";
import { setManagementTaskStatus } from "GraphQL/Mutations/setManagementTaskStatus.gql";
import { listManagementTasks } from "GraphQL/Queries/listManagementTasks.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  ListManagementTasksQuery,
  ListManagementTasksQueryVariables,
  ManagementTask,
  SetManagementTaskStatusMutation,
  SetManagementTaskStatusMutationVariables,
} from "GraphQL/Types";
import { ManagementTaskPriority, ManagementTaskStatus } from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { PropertyScopeModel } from "Models/PropertyScopeModel";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import { EnhancedSet } from "Tools/EnhancedSet";
import type { IManagementTasks, SortedTasks } from "./types";

export class ManagementTaskModel extends PropertyScopeModel<IManagementTasks> {
  private debouncer = new Debouncer(() => this.fetch(), 500);
  constructor() {
    super("Management Tasks", {
      loading: false,
      editing: false,
      creating: false,
      filters: false,
      priorityFilter: new EnhancedSet(),
      assignmentFilter: new EnhancedSet(),
      searchFilter: undefined,
      tasks: ManagementTaskModel.EMPTY_TABLE(),
      editableTask: ManagementTaskModel.EMPTY_TASK,
    });
  }

  public async fetch() {
    try {
      this.setLoading(true);
      const { priorityFilter, assignmentFilter, searchFilter } =
        this.getState();
      const response = await graphQLRequest<
        ListManagementTasksQuery,
        ListManagementTasksQueryVariables
      >(listManagementTasks, {
        assignedToId: assignmentFilter.size
          ? Array.from(assignmentFilter)
          : undefined,
        searchString: searchFilter ? searchFilter : undefined,
        priority: priorityFilter.size ? Array.from(priorityFilter) : undefined,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      const tasks = ManagementTaskModel.EMPTY_TABLE();
      for (const task of response.listManagementTasks) {
        tasks[task.status][task.id] = task;
      }
      this.set("tasks", tasks);
    } catch (error) {
      Toasts.error(
        "Something went wrong while fetching your maintenance items. Please try again",
      );
    } finally {
      this.setLoading(false);
    }
  }

  public setTaskStatus(task: ManagementTask, status: ManagementTaskStatus) {
    this.updateByID({ ...task, status });
    const client = new UIClient({});
    void client.executeQuery<
      SetManagementTaskStatusMutation,
      SetManagementTaskStatusMutationVariables
    >(setManagementTaskStatus, {
      status,
      id: task.id,
      organizationId: Scope.getState().currentOrganizationId,
    });
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

  public updateByID(task: ManagementTask) {
    this.update(state => {
      const copy = { ...state.tasks };
      for (const table in copy) {
        delete copy[table as ManagementTaskStatus][task.id];
      }
      copy[task.status][task.id] = task;
      state.tasks = copy;
    });
  }

  public setLoading(loading: boolean) {
    this.set("loading", loading);
  }

  public filterByPriority = this.debouncedFetchProxy(
    (priorities: EnhancedSet<ManagementTaskPriority>) => {
      this.set("priorityFilter", priorities);
    },
  );

  public filterByAssignee = this.debouncedFetchProxy(
    (assignees: EnhancedSet<number>) => {
      this.set("assignmentFilter", assignees);
    },
  );

  public search = this.debouncedFetchProxy((search?: string) => {
    this.set("searchFilter", search);
  });

  public clearPriorityFilter = this.debouncedFetchProxy(() => {
    this.set("priorityFilter", new EnhancedSet());
  });

  public clearAssignmentFilter = this.debouncedFetchProxy(() => {
    this.set("assignmentFilter", new EnhancedSet());
  });

  public resetAllFilters = this.debouncedFetchProxy(() => {
    this.update(state => {
      state.assignmentFilter = new EnhancedSet();
      state.priorityFilter = new EnhancedSet();
      state.searchFilter = undefined;
    });
  });

  private debouncedFetchProxy<F extends (...args: any[]) => any>(func: F) {
    return (...args: Parameters<F>) => {
      func(...args);
      void this.debouncer.execute();
    };
  }

  public set<K extends keyof IManagementTasks>(
    key: K,
    value: IManagementTasks[K],
  ) {
    this.update(state => {
      state[key] = value;
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

  public static readonly EMPTY_TASK: ManagementTask = {
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

  private openEdit = (task: ManagementTask) => {
    this.update(state => {
      state.editableTask = task;
      state.editing = true;
    });
  };

  private closeEdit = () => {
    this.update(state => {
      state.editing = false;
    });
    setTimeout(() => {
      this.set("editableTask", ManagementTaskModel.EMPTY_TASK);
    }, 400);
  };

  private openCreate = this.toggleKey("creating", true);
  private closeCreate = this.toggleKey("creating", false);

  private openFilters = this.toggleKey("filters", true);
  private closeFilters = this.toggleKey("filters", false);

  public createTask = this.createToggle(this.openCreate, this.closeCreate);
  public editTask = this.createToggle(this.openEdit, this.closeEdit);
  public filters = this.createToggle(this.openFilters, this.closeFilters);
}
