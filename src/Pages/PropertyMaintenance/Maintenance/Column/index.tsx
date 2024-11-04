import { memo, useMemo } from "react";
import type { ManagementTaskStatus } from "GraphQL/Types";
import { tasksOfStatus, useTasks } from "State/ManagementTasks";
import { Controller } from "./Controller";
import { NullTask } from "./NullTask";
import { Task } from "./Task";
import "./styles.scss";

export const Column = memo(function Column({ statusKey }: Props) {
  const selector = useMemo(() => tasksOfStatus(statusKey), [statusKey]);
  const tasks = useTasks(selector);
  return (
    <div className="scrum-column">
      <button className="header">
        <span>{Controller.MAP[statusKey]}</span>
      </button>
      {!tasks.length ? (
        <NullTask />
      ) : (
        tasks.map(task => {
          return <Task key={task.id} {...task} />;
        })
      )}
    </div>
  );
});

interface Props {
  statusKey: ManagementTaskStatus;
}
