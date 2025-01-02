import type { DragEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ManagementTask } from "GraphQL/Types";
import { DragAndDrop } from "Pages/PropertyMaintenance/DragAndDrop";
import { PriorityIcon } from "Pages/PropertyMaintenance/PriorityIcon";
import { TaskTags } from "Pages/PropertyMaintenance/TaskTags";
import { ManagementTasks } from "State/ManagementTasks";
import { Dates } from "Tools/Dates";
import "./styles.scss";

export const Task = memo(function Task(task: ManagementTask) {
  const {
    title,
    createdAt,
    description,
    assignedTo,
    priority,
    images,
    expenses,
  } = task;
  const isDragging = DragAndDrop.useDragging();
  const dateDisplay = useMemo(
    () => Dates.format(new Date(createdAt)),
    [createdAt],
  );

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

  const visibleAttachments = useMemo(() => images.slice(0, 4), [images]);

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
        <PriorityIcon priority={priority} />
      </div>
      <div className="description">{description}</div>
      {!!visibleAttachments.length && (
        <div className="attachments">
          <div className="subtext">Attachments:</div>
          <div className="grid">
            {visibleAttachments.map(img => (
              <div key={img.id}>
                <img src={img.url} alt="attachment" />
              </div>
            ))}
          </div>
        </div>
      )}
      <TaskTags totalImages={images.length} totalExpenses={expenses.length} />
    </button>
  );
});
