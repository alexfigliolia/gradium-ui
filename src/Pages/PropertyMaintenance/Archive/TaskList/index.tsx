import { Masonry } from "masonic";
import { memo, useMemo } from "react";
import { ManagementTaskStatus } from "GraphQL/Types";
import { TaskBody } from "Pages/PropertyMaintenance/TaskBody";
import { tasksOfStatus, useTasks } from "State/ManagementTasks";
import { selectWidth, useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import "./styles.scss";

const TODOS = tasksOfStatus(ManagementTaskStatus.Todo);

export const TaskList = memo(
  function TaskList(_: Propless) {
    const tasks = useTasks(TODOS);
    const width = useScreen(selectWidth);
    const columns = useMemo(() => (width >= 957 ? 2 : 1), [width]);
    return (
      <div className="task-list">
        <Masonry
          className="task-list"
          items={tasks}
          columnGutter={16}
          maxColumnCount={columns}
          render={({ data }) => (
            <div key={data.id} className="task inline-task">
              <TaskBody {...data} />
            </div>
          )}
        />
      </div>
    );
  },
  () => true,
);
