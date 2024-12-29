import { createUseState } from "@figliolia/react-galena";
import type { ManagementTaskStatus } from "GraphQL/Types";
import type { IManagementTasks } from "Models/ManagementTasks";
import { ManagementTaskModel } from "Models/ManagementTasks";

export const ManagementTasks = new ManagementTaskModel();
export const useTasks = createUseState(ManagementTasks);
export const creating = (state: IManagementTasks) => state.creating;
export const editing = (state: IManagementTasks) => state.editing;
export const isLoading = (state: IManagementTasks) => state.loading;
export const selectScopedTask = (state: IManagementTasks) => state.editableTask;
export const tasksOfStatus =
  (status: ManagementTaskStatus) => (state: IManagementTasks) =>
    Object.values(state.tasks[status]);
export const filtersOpen = (state: IManagementTasks) => state.filters;
export const selectSearchFilter = (state: IManagementTasks) =>
  state.searchFilter;
export const selectAssignmentFilter = (state: IManagementTasks) =>
  state.assignmentFilter;
export const selectPriorityFilter = (state: IManagementTasks) =>
  state.priorityFilter;
export const totalActiveFilters = (state: IManagementTasks) =>
  state.priorityFilter.size +
  state.assignmentFilter.size +
  (state.searchFilter ? 1 : 0);
