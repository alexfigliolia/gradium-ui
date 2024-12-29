import type { DragEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ManagementTask } from "GraphQL/Types";
import { DragAndDrop } from "Pages/PropertyMaintenance/DragAndDrop";
import { ManagementTasks } from "State/ManagementTasks";
import { Dates } from "Tools/Dates";
import { Controller } from "./Controller";
import "./styles.scss";

export const Task = memo(function Task(task: ManagementTask) {
  const { title, createdAt, description, assignedTo, priority } = task;
  const isDragging = DragAndDrop.useDragging();
  const dateDisplay = useMemo(
    () => Dates.format(new Date(createdAt)),
    [createdAt],
  );

  const onClick = useCallback(() => {
    ManagementTasks.editTask.open(task);
  }, [task]);

  const classes = useClassNames("task", {
    disabled: isDragging,
  });

  const Icon = useMemo(() => Controller.priorityIcon(priority), [priority]);

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
      <div className="title">
        <div>
          <div>{title}</div>
          <div className="subtext">{dateDisplay}</div>
          {assignedTo && (
            <div className="subtext">
              Assigned To: <span>{assignedTo?.name}</span>
            </div>
          )}
        </div>
        <Icon />
      </div>
      <div className="description">{description}</div>
    </button>
  );
});
