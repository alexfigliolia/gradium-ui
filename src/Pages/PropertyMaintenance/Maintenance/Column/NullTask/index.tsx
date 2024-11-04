import { memo } from "react";
import "./styles.scss";

export const NullTask = memo(function NullTask() {
  return <button className="null-task">Add a Task</button>;
});
