import { createUseState } from "@figliolia/react-galena";
import type { ManagementTaskStatus } from "GraphQL/Types";
import type { IManagementTasks } from "Models/ManagementTask";
import { ManagementTaskModel } from "Models/ManagementTask";

export const ManagementTasks = new ManagementTaskModel();
export const useTasks = createUseState(ManagementTasks);

export const tasksOfStatus =
  (status: ManagementTaskStatus) => (state: IManagementTasks) =>
    Object.values(state.tasks[status]);
