import { memo } from "react";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const TaskTag = memo(function TaskTag({ children }: OptionalChildren) {
  return <div className="task-tag">{children}</div>;
});
