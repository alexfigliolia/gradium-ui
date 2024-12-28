import { memo } from "react";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import type { Propless } from "Types/React";
import { Column } from "../Column";
import "./styles.scss";

export const LargeScreenDisplay = memo(
  function LargeScreenDisplay(_: Propless) {
    return (
      <div className="scrum">
        <div>
          {DisplayController.statuses.map(status => {
            return <Column key={status} status={status} />;
          })}
        </div>
      </div>
    );
  },
  () => true,
);
