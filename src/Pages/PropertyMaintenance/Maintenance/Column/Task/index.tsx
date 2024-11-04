import { memo, useMemo } from "react";
import type { ManagementTask } from "GraphQL/Types";
import { Controller } from "./Controller";
import "./styles.scss";

export const Task = memo(function Task({
  title,
  priority,
  assignedTo,
  createdAt,
  description,
}: ManagementTask) {
  const displayPriority = useMemo(
    () => Controller.mapPriority(priority),
    [priority],
  );
  const Icon = useMemo(() => Controller.renderIcon(priority), [priority]);
  const date = useMemo(() => new Date(parseInt(createdAt)), [createdAt]);
  const ISO = useMemo(() => date.toISOString(), [date]);
  const userFacingDate = useMemo(() => Controller.renderDateTime(date), [date]);
  return (
    <button className="management-task">
      <div className="management-task__title">
        <div>
          <h4>{title}</h4>
          <Icon aria-hidden />
        </div>
        <time dateTime={ISO}>{userFacingDate}</time>
        {assignedTo && (
          <p>
            Assigned:&nbsp;&nbsp;
            <strong> {assignedTo?.name || "Alex Figliolia"}</strong>
          </p>
        )}
        {true && (
          <p>
            Priority:&nbsp;&nbsp;
            <strong className={priority}> {displayPriority}</strong>
          </p>
        )}
      </div>
      <p>{description}</p>
    </button>
  );
});
