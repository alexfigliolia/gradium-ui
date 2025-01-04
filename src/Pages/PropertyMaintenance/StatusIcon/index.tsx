import { memo } from "react";
import type { ManagementTaskStatus } from "GraphQL/Types";
import { Status } from "Icons/Status";
import "./styles.scss";

export const StatusIcon = memo(function StatusIcon({ status }: Props) {
  return <Status className={status} />;
});

interface Props {
  status: ManagementTaskStatus;
}
