import type {
  ManagementTask,
  ManagementTaskPriority,
  ManagementTaskStatus,
} from "GraphQL/Types";
import type { EnhancedSet } from "Tools/EnhancedSet";

export type TaskTable = Record<number, ManagementTask>;

export type SortedTasks = Record<ManagementTaskStatus, TaskTable>;

export interface IManagementTasks {
  filters: boolean;
  loading: boolean;
  creating: boolean;
  editing: boolean;
  tasks: SortedTasks;
  editableTask: ManagementTask;
  priorityFilter: EnhancedSet<ManagementTaskPriority>;
  assignmentFilter: EnhancedSet<number>;
  searchFilter?: string;
}
