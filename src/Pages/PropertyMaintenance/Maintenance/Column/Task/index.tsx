import type { DragEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ManagementTask } from "GraphQL/Types";
import { Attachment } from "Icons/Attachment";
import { MoneyStroked } from "Icons/Money";
import { DragAndDrop } from "Pages/PropertyMaintenance/DragAndDrop";
import { ManagementTasks } from "State/ManagementTasks";
import { Dates } from "Tools/Dates";
import { Controller } from "./Controller";
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
        <Icon />
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
      {(!!images.length || !!expenses.length) && (
        <div className="meta-data">
          {!!images.length && (
            <div>
              <Attachment />
              {images.length}
            </div>
          )}
          {!!expenses.length && (
            <div>
              <MoneyStroked />
              {expenses.length}
            </div>
          )}
        </div>
      )}
    </button>
  );
});
