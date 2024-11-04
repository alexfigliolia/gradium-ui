import { memo } from "react";
import { ManagementTaskStatus } from "GraphQL/Types";
import type { Propless } from "Types/React";
import { Column } from "./Column";
import "./styles.scss";

export const Maintenance = memo(
  function Maintenance(_: Propless) {
    return (
      <div className="scrum">
        <Column statusKey={ManagementTaskStatus.Todo} />
        <Column statusKey={ManagementTaskStatus.InProgress} />
        <Column statusKey={ManagementTaskStatus.UnderReview} />
        <Column statusKey={ManagementTaskStatus.Complete} />
      </div>
    );
  },
  () => true,
);
