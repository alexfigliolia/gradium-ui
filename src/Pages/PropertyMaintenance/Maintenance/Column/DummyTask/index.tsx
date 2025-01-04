import { memo, useCallback } from "react";
import type { ManagementTaskStatus } from "GraphQL/Types";
import { ManagementTasks } from "State/ManagementTasks";
import "./styles.scss";

export const DummyTask = memo(
  function DummyTask({ status }: Props) {
    const open = useCallback(() => {
      ManagementTasks.createTask.open(status);
    }, [status]);
    return (
      <button className="dummy-task" onClick={open}>
        Create Task
      </button>
    );
  },
  () => true,
);

interface Props {
  status: ManagementTaskStatus;
}
