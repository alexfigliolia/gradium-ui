import { memo, useMemo } from "react";
import type { ManagementTask } from "GraphQL/Types";
import { Dates } from "Tools/Dates";
import { Controller } from "./Controller";
import "./styles.scss";

export const Task = memo(function Task({
  title,
  createdAt,
  description,
  assignedTo,
  priority,
}: ManagementTask) {
  const dateDisplay = useMemo(
    () => Dates.format(new Date(createdAt)),
    [createdAt],
  );
  const Icon = useMemo(() => Controller.priorityIcon(priority), [priority]);
  return (
    <div className="task">
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
    </div>
  );
});
