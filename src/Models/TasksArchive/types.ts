import type { TaskTable } from "Models/ManagementTasks";
import type { ITaskModel } from "Models/TaskModel";

export interface ITaskArchive extends ITaskModel {
  archive: boolean;
  tasks: TaskTable;
}
