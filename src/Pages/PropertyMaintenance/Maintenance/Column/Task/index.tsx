import type { DragEvent } from "react";
import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ManagementTask } from "GraphQL/Types";
import { DragAndDrop } from "Pages/PropertyMaintenance/DragAndDrop";
import { TaskBody } from "Pages/PropertyMaintenance/TaskBody";
import { ManagementTasks } from "State/ManagementTasks";
import "./styles.scss";

export const Task = memo(function Task(task: ManagementTask) {
  const isDragging = DragAndDrop.useDragging();

  const onClick = useCallback(() => {
    ManagementTasks.viewTask.open(task);
  }, [task]);

  const classes = useClassNames("task", {
    disabled: isDragging,
  });

  const onDragStart = useCallback(
    (e: DragEvent<HTMLButtonElement>) => {
      e.dataTransfer.effectAllowed = "move";
      DragAndDrop.registerDrag(task.id, task);
    },
    [task],
  );

  const onDragEnd = useCallback(() => {
    DragAndDrop.reset();
  }, []);

  return (
    <button
      draggable
      className={classes}
      onClick={onClick}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}>
      <TaskBody {...task} />
    </button>
  );
});
