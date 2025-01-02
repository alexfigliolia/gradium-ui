import { memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ManagementTaskPriority } from "GraphQL/Types";
import { DisplayController } from "../DisplayController";
import "./styles.scss";

export const PriorityIcon = memo(function PriorityIcon({
  priority,
  fill = false,
}: Props) {
  const Icon = useMemo(
    () => DisplayController.priorityIcon(priority),
    [priority],
  );
  const classes = useClassNames("priority-icon", { fill });
  return (
    <div className={classes}>
      <Icon />
    </div>
  );
});

interface Props {
  fill?: boolean;
  priority: ManagementTaskPriority;
}
