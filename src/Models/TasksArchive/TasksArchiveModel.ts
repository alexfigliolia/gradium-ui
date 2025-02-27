import { listManagementTasks } from "GraphQL/Queries/listManagementTasks.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  Expense,
  ListManagementTasksQuery,
  ListManagementTasksQueryVariables,
  ManagementTask,
} from "GraphQL/Types";
import type { TaskTable } from "Models/ManagementTasks";
import { TaskModel } from "Models/TaskModel";
import { ManagementTasks } from "State/ManagementTasks";
import { Toasts } from "State/Toasts";
import { EnhancedSet } from "Tools/EnhancedSet";
import type { ITaskArchive } from "./types";

export class TasksArchiveModel extends TaskModel<ITaskArchive> {
  private fetched = false;
  constructor() {
    super("Tasks Archive", {
      tasks: {},
      archive: false,
      loading: false,
      filters: false,
      searchFilter: undefined,
      priorityFilter: new EnhancedSet(),
      assignmentFilter: new EnhancedSet(),
    });
  }

  public async fetch() {
    try {
      this.setLoading(true);
      const response = await graphQLRequest<
        ListManagementTasksQuery,
        ListManagementTasksQueryVariables
      >(listManagementTasks, {
        archive: true,
        ...this.getGQLArgs(),
      });
      const tasks: TaskTable = {};
      for (const task of response.listManagementTasks) {
        tasks[task.id] = task;
      }
      this.set("tasks", tasks);
      this.fetched = true;
    } catch (error) {
      Toasts.error(
        "Something went wrong while fetching your maintenance items. Please try again",
      );
    } finally {
      this.setLoading(false);
    }
  }

  public pushExpense(expense: Expense) {
    this.update(state => {
      const { scopedTask } = ManagementTasks.getState();
      state.tasks[scopedTask.id] = {
        ...scopedTask,
        expenses: [...scopedTask.expenses, expense],
      };
    });
  }

  public updateByID(task: ManagementTask, scopedTask = true) {
    this.update(state => {
      const copy = { ...state.tasks };
      copy[task.id] = task;
      state.tasks = copy;
      if (scopedTask) {
        ManagementTasks.setScopedTask(task);
      }
    });
  }

  public updateExpenseByID(expense: Expense, scoped = true) {
    this.update(state => {
      const { scopedTask } = ManagementTasks.getState();
      const task = {
        ...scopedTask,
        expenses: scopedTask.expenses.map(exp =>
          exp.id === expense.id ? expense : exp,
        ),
      };
      state.tasks = { ...state.tasks, [task.id]: task };
      ManagementTasks.setScopedTask(task);
      if (scoped) {
        ManagementTasks.setScopedExpense(expense);
      }
    });
  }

  public deleteByID(id: number) {
    this.update(state => {
      const { [id]: _deletion, ...rest } = state.tasks;
      state.tasks = rest;
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
    return tasks[id];
  }

  private readonly openArchive = () => {
    if (!this.fetched) {
      void this.fetch();
    }
    this.update(state => {
      state.archive = true;
    });
  };

  public archive = this.createToggle(
    this.openArchive,
    this.toggleKey("archive", false),
  );
  public readonly filters = this.createBasicToggle("filters");
}
