import { memo, useContext, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ColoredLoadingState } from "Components/ColoredLoadingState";
import { IconButton } from "Components/IconButton";
import { ThinLockClosed } from "Icons/ThinLockClosed";
import { ThinLockOpen } from "Icons/ThinLockOpen";
import { TrashThin } from "Icons/TrashThin";
import type { Propless } from "Types/React";
import { CSFContext } from "../Context";
import "./styles.scss";

export const CRUDActions = memo(
  function CRUDActions(_: Propless) {
    const { editing, toggleEdit, loading, error, success, onDelete } =
      useContext(CSFContext);

    const classes = useClassNames("space-crud-actions", {
      open: editing,
      loading,
    });

    const label = useMemo(() => {
      if (editing) {
        return "Lock Editing";
      }
      return "Unlock Editing";
    }, [editing]);

    return (
      <div className={classes}>
        <IconButton
          className="editor-toggle"
          aria-label={label}
          onClick={toggleEdit}>
          <ThinLockClosed aria-hidden />
          <ThinLockOpen aria-hidden />
          <ColoredLoadingState
            loading={loading}
            error={error}
            success={success}
          />
        </IconButton>
        <IconButton
          className="trash-button"
          aria-label="Delete Item"
          onClick={onDelete}>
          <TrashThin aria-hidden />
        </IconButton>
      </div>
    );
  },
  () => true,
);
