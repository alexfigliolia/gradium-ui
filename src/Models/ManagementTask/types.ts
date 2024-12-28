import type { ManagementTask, ManagementTaskStatus } from "GraphQL/Types";

export type TaskTable = Record<number, ManagementTask>;

export type SortedTasks = Record<ManagementTaskStatus, TaskTable>;

export interface IManagementTasks {
  creating: boolean;
  editing: boolean;
  tasks: SortedTasks;
  editableTask: ManagementTask;
}
