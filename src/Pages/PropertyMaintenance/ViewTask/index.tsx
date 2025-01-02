import { memo, useMemo } from "react";
import { Confirmation } from "Components/Confirmation";
import { GradientButton } from "Components/GradientButton";
import {
  ManagementTasks,
  selectScopedTask,
  useTasks,
  viewing,
} from "State/ManagementTasks";
import { selectUserId, useScope } from "State/Scope";
import { Dates } from "Tools/Dates";
import type { Propless } from "Types/React";
import { DisplayController } from "../DisplayController";
import { PriorityIcon } from "../PriorityIcon";
import { Attachments } from "./Attachments";
import "./styles.scss";

export const ViewTask = memo(
  function ViewTask(_: Propless) {
    const open = useTasks(viewing);
    const task = useTasks(selectScopedTask);
    const userID = useScope(selectUserId);
    const date = useMemo(
      () => Dates.format(new Date(task.createdAt)),
      [task.createdAt],
    );

    return (
      <Confirmation
        open={open}
        className="task-viewer"
        close={ManagementTasks.viewTask.close}>
        <div className="title">
          <div className="priority">
            <PriorityIcon fill priority={task.priority} />{" "}
            {DisplayController.displayPriority(task.priority)}
          </div>
          <h2>{task.title}</h2>
          <p>
            Created {date} by <strong>{task.createdBy.name}</strong>
          </p>
        </div>
        {task.description && <p>{task.description}</p>}
        {task.assignedTo && (
          <div className="title">
            <p>
              Assigned to: <strong>{task.assignedTo.name}</strong>
            </p>
          </div>
        )}
        {!!task.images.length && (
          <Attachments id={task.id} images={task.images} />
        )}
        <div className="actions">
          {userID === task.createdBy.id && (
            <GradientButton
              onClick={ManagementTasks.deleteTask.open}
              className="delete">
              Delete Task
            </GradientButton>
          )}
          <GradientButton onClick={ManagementTasks.editTask.open}>
            Edit Task
          </GradientButton>
        </div>
      </Confirmation>
    );
  },
  () => true,
);
