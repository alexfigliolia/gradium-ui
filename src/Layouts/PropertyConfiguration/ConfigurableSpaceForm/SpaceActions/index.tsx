import { memo } from "react";
import type { Callback } from "Types/Generics";
import { SpaceUploader } from "./SpaceUploader";
import "./styles.scss";

export const SpaceActions = memo(function SpaceActions({
  editing,
  toggleEdit,
}: Props) {
  return (
    <div className="space-actions">
      <button type="button" onClick={toggleEdit}>
        {editing ? "Lock" : "Edit"}
      </button>
      <SpaceUploader editing={editing}>Upload Photos</SpaceUploader>
      <SpaceUploader editing={editing}>Upload Floorplans</SpaceUploader>
    </div>
  );
});

interface Props {
  editing: boolean;
  toggleEdit: Callback;
}
