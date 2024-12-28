import { memo } from "react";
import { ManagementTasks } from "State/ManagementTasks";
import type { Propless } from "Types/React";
import "./styles.scss";

export const DummyTask = memo(
  function DummyTask(_: Propless) {
    return (
      <button className="dummy-task" onClick={ManagementTasks.createTask.open}>
        Create Task
      </button>
    );
  },
  () => true,
);
