import { Debouncer } from "@figliolia/react-hooks";
import { setManagementTaskStatus } from "GraphQL/Mutations/setManagementTaskStatus.gql";
import { listManagementTasks } from "GraphQL/Queries/listManagementTasks.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  Expense,
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
  private readonly debouncer = new Debouncer(() => this.fetch(), 500);
  constructor() {
    super("Management Tasks", {
      loading: false,
      viewing: false,
      creating: false,
      filters: false,
      deleting: false,
      viewingExpense: false,
      creatingExpense: false,
      deletingExpense: false,
      priorityFilter: new EnhancedSet(),
      assignmentFilter: new EnhancedSet(),
      searchFilter: undefined,
      tasks: ManagementTaskModel.EMPTY_TABLE(),
      scopedTask: ManagementTaskModel.EMPTY_TASK,
      scopedExpense: ManagementTaskModel.EMPTY_EXPENSE,
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

  public pushExpense(expense: Expense) {
    this.update(state => {
      const update = {
        ...state.scopedTask,
        expenses: [...state.scopedTask.expenses, expense],
      };
      state.scopedTask = update;
      state.tasks[update.status][update.id] = update;
    });
  }

  public updateByID(task: ManagementTask, scopedTask = true) {
    this.update(state => {
      const copy = { ...state.tasks };
      for (const table in copy) {
        delete copy[table as ManagementTaskStatus][task.id];
      }
      copy[task.status][task.id] = task;
      state.tasks = copy;
      if (scopedTask && state.scopedTask.id === task.id) {
        state.scopedTask = task;
      }
    });
  }

  public updateExpenseByID(expense: Expense, scoped = true) {
    this.update(state => {
      const copy = { ...state.tasks };
      const task = {
        ...state.scopedTask,
        expenses: state.scopedTask.expenses.map(exp =>
          exp.id === expense.id ? expense : exp,
        ),
      };
      for (const table in copy) {
        delete copy[table as ManagementTaskStatus][task.id];
      }
      copy[task.status][task.id] = task;
      state.tasks = copy;
      state.scopedTask = task;
      if (scoped) {
        state.scopedExpense = expense;
      }
    });
  }

  public deleteByID(id: number) {
    this.update(state => {
      const copy = { ...state.tasks };
      for (const table in copy) {
        delete copy[table as ManagementTaskStatus][id];
      }
      state.tasks = copy;
    });
  }

  public partialUpdateByID(
    id: number,
    update: Partial<Omit<ManagementTask, "id">>,
  ) {
    const task = this.getByID(id);
    if (!task) {
      return;
    }
    const updated = { ...task, ...update };
    this.updateByID(updated);
  }

  public getByID(id: number) {
    const { tasks } = this.getState();
    for (const key in tasks) {
      const status = key as ManagementTaskStatus;
      if (id in tasks[status]) {
        return tasks[status][id];
      }
    }
  }

  public setLoading(loading: boolean) {
    this.set("loading", loading);
  }

  public readonly filterByPriority = this.debouncedFetchProxy(
    (priorities: EnhancedSet<ManagementTaskPriority>) => {
      this.set("priorityFilter", priorities);
    },
  );

  public readonly filterByAssignee = this.debouncedFetchProxy(
    (assignees: EnhancedSet<number>) => {
      this.set("assignmentFilter", assignees);
    },
  );

  public readonly search = this.debouncedFetchProxy((search?: string) => {
    this.set("searchFilter", search);
  });

  public readonly clearPriorityFilter = this.debouncedFetchProxy(() => {
    this.set("priorityFilter", new EnhancedSet());
  });

  public readonly clearAssignmentFilter = this.debouncedFetchProxy(() => {
    this.set("assignmentFilter", new EnhancedSet());
  });

  public readonly resetAllFilters = this.debouncedFetchProxy(() => {
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

  public static readonly EMPTY_EXPENSE: Expense = {
    id: -1,
    createdAt: new Date().toISOString(),
    createdBy: {
      id: -1,
      name: "",
    },
    cost: "",
    title: "",
    description: "",
    attachments: [],
  };

  private readonly openTask = (task: ManagementTask) => {
    this.update(state => {
      state.viewing = true;
      state.scopedTask = task;
    });
  };

  private readonly openCreate = (
    status: ManagementTaskStatus = ManagementTaskStatus.Todo,
  ) => {
    this.update(state => {
      state.creating = true;
      state.scopedTask = {
        ...ManagementTaskModel.EMPTY_TASK,
        status,
        createdBy: {
          id: -1,
          name: Scope.getState().name,
        },
      };
    });
  };

  private readonly closeCreate = () => {
    this.set("creating", false);
    setTimeout(() => {
      this.set("scopedTask", ManagementTaskModel.EMPTY_TASK);
    }, 500);
  };

  private readonly openExpense = (expense: Expense) => {
    this.update(state => {
      state.viewingExpense = true;
      state.scopedExpense = expense;
    });
  };

  private readonly openCreateExpense = () => {
    this.update(state => {
      state.creatingExpense = true;
      state.scopedExpense = {
        ...ManagementTaskModel.EMPTY_EXPENSE,
        createdBy: {
          id: -1,
          name: Scope.getState().name,
        },
      };
    });
  };

  private readonly closeCreateExpense = () => {
    this.set("creatingExpense", false);
    setTimeout(() => {
      this.set("scopedExpense", ManagementTaskModel.EMPTY_EXPENSE);
    }, 500);
  };

  private readonly closeTask = this.toggleKey("viewing", false);
  private readonly closeExpense = this.toggleKey("viewingExpense", false);

  private readonly openDelete = this.toggleKey("deleting", true);
  private readonly closeDelete = this.toggleKey("deleting", false);

  private readonly openDeleteExpense = this.toggleKey("deletingExpense", true);
  private readonly closeDeleteExpense = this.toggleKey(
    "deletingExpense",
    false,
  );

  private readonly openFilters = this.toggleKey("filters", true);
  private readonly closeFilters = this.toggleKey("filters", false);

  public readonly createTask = this.createToggle(
    this.openCreate,
    this.closeCreate,
  );
  public readonly createExpense = this.createToggle(
    this.openCreateExpense,
    this.closeCreateExpense,
  );
  public readonly viewTask = this.createToggle(this.openTask, this.closeTask);
  public readonly viewExpense = this.createToggle(
    this.openExpense,
    this.closeExpense,
  );
  public readonly deleteTask = this.createToggle(
    this.openDelete,
    this.closeDelete,
  );
  public readonly deleteExpense = this.createToggle(
    this.openDeleteExpense,
    this.closeDeleteExpense,
  );
  public readonly filters = this.createToggle(
    this.openFilters,
    this.closeFilters,
  );

  public override closeAll() {
    super.closeAll();
    this.update(state => {
      state.scopedTask = ManagementTaskModel.EMPTY_TASK;
      state.scopedExpense = ManagementTaskModel.EMPTY_EXPENSE;
    });
  }
}
