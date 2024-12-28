import { memo, useMemo } from "react";
import type { ManagementTaskStatus } from "GraphQL/Types";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import { tasksOfStatus, useTasks } from "State/ManagementTasks";
import { DummyTask } from "./DummyTask";
import { Task } from "./Task";
import "./styles.scss";

export const Column = memo(function Column({ status }: Props) {
  const label = useMemo(
    () => DisplayController.displayStatus(status),
    [status],
  );
  const selector = useMemo(() => tasksOfStatus(status), [status]);
  const tasks = useTasks(selector);
  return (
    <div className="column">
      <div>
        <h3>{label}</h3>
        <div className="column-list">
          {tasks.length ? (
            tasks.map(task => <Task key={task.id} {...task} />)
          ) : (
            <DummyTask />
          )}
        </div>
      </div>
    </div>
  );
});

interface Props {
  status: ManagementTaskStatus;
}
