import { createUseState } from "@figliolia/react-galena";
import type { ITaskArchive } from "Models/TasksArchive";
import { TasksArchiveModel } from "Models/TasksArchive";

export const TasksArchive = new TasksArchiveModel();
export const useTasksArchive = createUseState(TasksArchive);

export const filters = (state: ITaskArchive) => state.filters;
export const archive = (state: ITaskArchive) => state.archive;
export const archivedTasks = (state: ITaskArchive) =>
  Object.values(state.tasks);
export const selectPriorityFilter = (state: ITaskArchive) =>
  state.priorityFilter;
export const selectAssignmentFilter = (state: ITaskArchive) =>
  state.assignmentFilter;
