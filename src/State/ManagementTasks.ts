import { createUseState } from "@figliolia/react-galena";
import type { ManagementTaskStatus } from "GraphQL/Types";
import type { IManagementTasks } from "Models/ManagementTasks";
import { ManagementTaskModel } from "Models/ManagementTasks";

export const ManagementTasks = new ManagementTaskModel();
export const useTasks = createUseState(ManagementTasks);
export const creating = (state: IManagementTasks) => state.creating;
export const creatingExpense = (state: IManagementTasks) =>
  state.creatingExpense;
export const deleting = (state: IManagementTasks) => state.deleting;
export const viewing = (state: IManagementTasks) => state.viewing;
export const deletingExpense = (state: IManagementTasks) =>
  state.deletingExpense;
export const viewingExpense = (state: IManagementTasks) => state.viewingExpense;
export const isLoading = (state: IManagementTasks) => state.loading;
export const selectScopedTask = (state: IManagementTasks) => state.scopedTask;
export const selectScopedExpense = (state: IManagementTasks) =>
  state.scopedExpense;
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
