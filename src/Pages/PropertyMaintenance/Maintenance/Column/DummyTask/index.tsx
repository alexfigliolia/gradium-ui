import { memo, useCallback, useMemo } from "react";
import { ManagementTaskStatus } from "GraphQL/Types";
import { ManagementTasks } from "State/ManagementTasks";
import { TasksArchive } from "State/TasksArchive";
import "./styles.scss";

export const DummyTask = memo(
  function DummyTask({ status }: Props) {
    const complete = useMemo(
      () => status === ManagementTaskStatus.Complete,
      [status],
    );
    const openCreate = useCallback(() => {
      if (complete) {
        return TasksArchive.archive.open();
      }
      ManagementTasks.createTask.open(status);
    }, [status, complete]);
    return (
      <button className="dummy-task" onClick={openCreate}>
        {complete ? "View Archive" : "Create Task"}
      </button>
    );
  },
  () => true,
);

interface Props {
  status: ManagementTaskStatus;
}
