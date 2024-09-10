import { memo } from "react";
import type { Callback } from "Types/Generics";
import { SpaceUploader } from "./SpaceUploader";
import "./styles.scss";

export const SpaceActions = memo(function SpaceActions({
  edit,
  editing,
}: Props) {
  return (
    <div className="space-actions">
      <button type="button" onClick={edit}>
        {editing ? "Lock" : "Edit"}
      </button>
      <SpaceUploader editing={editing}>Upload Photos</SpaceUploader>
      <SpaceUploader editing={editing}>Upload Floorplans</SpaceUploader>
    </div>
  );
});

interface Props {
  edit: Callback;
  editing: boolean;
}
