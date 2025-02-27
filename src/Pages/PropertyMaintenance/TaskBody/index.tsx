import { Fragment, memo, useMemo } from "react";
import type { ManagementTask } from "GraphQL/Types";
import { Dates } from "Tools/Dates";
import { PriorityIcon } from "../PriorityIcon";
import { TaskTags } from "../TaskTags";
import "./styles.scss";

export const TaskBody = memo(function TaskBody({
  title,
  createdAt,
  assignedTo,
  priority,
  description,
  images,
  expenses,
}: ManagementTask) {
  const dateDisplay = useMemo(
    () => Dates.format(new Date(createdAt)),
    [createdAt],
  );
  const visibleAttachments = useMemo(() => images.slice(0, 4), [images]);
  return (
    <Fragment>
      <div className="title">
        <div className="title-content">
          <div className="titletext">{title}</div>
          <div className="subtext">{dateDisplay}</div>
          {assignedTo && (
            <div className="subtext">
              Assigned To: <span>{assignedTo?.name}</span>
            </div>
          )}
        </div>
        <PriorityIcon priority={priority} />
      </div>
      {description && <div className="description">{description}</div>}
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
      <TaskTags totalImages={images.length} expenses={expenses} />
    </Fragment>
  );
});
