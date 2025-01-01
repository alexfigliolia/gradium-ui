import type { DragEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import type { ManagementTaskStatus } from "GraphQL/Types";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import { DragAndDrop } from "Pages/PropertyMaintenance/DragAndDrop";
import {
  ManagementTasks,
  tasksOfStatus,
  useTasks,
} from "State/ManagementTasks";
import { DummyTask } from "./DummyTask";
import { Task } from "./Task";
import "./styles.scss";
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

export const Column = memo(function Column({ status }: Props) {
  const label = useMemo(
    () => DisplayController.displayStatus(status),
    [status],
  );
  const selector = useMemo(() => tasksOfStatus(status), [status]);
  const tasks = useTasks(selector);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const { data } = DragAndDrop.getState();
      if (data) {
        ManagementTasks.setTaskStatus(data, status);
      }
      DragAndDrop.reset();
    },
    [status],
  );

  return (
    <div
      role="listitem"
      className="column"
      onDrop={onDrop}
      onDragOver={onDragOver}>
      <div>
        <h3>{label}</h3>
        <div className="column-list">
          <DummyTask />
          {tasks.map(task => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
});

interface Props {
  status: ManagementTaskStatus;
}
