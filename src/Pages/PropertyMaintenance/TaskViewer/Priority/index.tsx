import { memo } from "react";
import type { ManagementTaskPriority } from "GraphQL/Types";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import { PriorityIcon } from "Pages/PropertyMaintenance/PriorityIcon";
import { TaskSelector } from "Pages/PropertyMaintenance/TaskSelector";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const Priority = memo(function Priority({ priority, onChange }: Props) {
  return (
    <TaskSelector
      value={priority}
      onChange={onChange}
      title="Select a Priority"
      className="priority-selector"
      options={DisplayController.fullPriorityOptions}>
      <PriorityIcon fill priority={priority} />{" "}
      {DisplayController.displayPriority(priority)}
    </TaskSelector>
  );
});

interface Props {
  priority: ManagementTaskPriority;
  onChange: Callback<[string]>;
}
