import { memo, useContext } from "react";
import type { Propless } from "Types/React";
import { CSFContext } from "../Context";
import { SpaceUploader } from "./SpaceUploader";
import "./styles.scss";

export const SpaceActions = memo(
  function SpaceActions(_: Propless) {
    const { editing, toggleEdit, controller } = useContext(CSFContext);
    return (
      <div className="space-actions">
        <button type="button" onClick={toggleEdit}>
          {editing ? "Lock" : "Edit"}
        </button>
        <SpaceUploader editing={editing} onUpload={controller.uploadImages}>
          Upload Photos
        </SpaceUploader>
        <SpaceUploader editing={editing} onUpload={controller.uploadFloorPlans}>
          Upload Floorplans
        </SpaceUploader>
      </div>
    );
  },
  () => true,
);
