import type {
  Expense,
  ManagementTask,
  ManagementTaskStatus,
} from "GraphQL/Types";
import type { ITaskModel } from "Models/TaskModel";

export type TaskTable = Record<number, ManagementTask>;

export type SortedTasks = Record<ManagementTaskStatus, TaskTable>;

export interface IManagementTasks extends ITaskModel {
  creating: boolean;
  viewing: boolean;
  deleting: boolean;
  tasks: SortedTasks;
  scopedExpense: Expense;
  creatingExpense: boolean;
  viewingExpense: boolean;
  deletingExpense: boolean;
  scopedTask: ManagementTask;
}
