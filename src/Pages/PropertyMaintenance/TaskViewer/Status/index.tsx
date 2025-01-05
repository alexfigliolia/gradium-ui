import { memo } from "react";
import type { ManagementTaskStatus } from "GraphQL/Types";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import { StatusIcon } from "Pages/PropertyMaintenance/StatusIcon";
import { TaskSelector } from "Pages/PropertyMaintenance/TaskSelector";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const Status = memo(function Status({ status, onChange }: Props) {
  return (
    <TaskSelector
      value={status}
      onChange={onChange}
      title="Select a Status"
      className="status-selector"
      options={DisplayController.statusOptions}>
      <StatusIcon status={status} />
      {DisplayController.displayStatus(status)}
    </TaskSelector>
  );
});

interface Props {
  status: ManagementTaskStatus;
  onChange: Callback<[string]>;
}
