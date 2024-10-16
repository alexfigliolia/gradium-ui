import { Fragment, memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ActionButton } from "Components/ActionButton";
import { CircularIconButton } from "Components/CircularIconButton";
import { Trash } from "Icons/Trash";
import type { Callback } from "Types/Generics";
import type { ActionState, OptionalChildren } from "Types/React";
import { SpaceActions } from "./SpaceActions";
import { SpaceImages } from "./SpaceImages";
import "./styles.scss";

export const PropertySpaceInputs = memo(function PropertySpaceInputs({
  name,
  error,
  loading,
  success,
  editing,
  children,
  className,
  toggleEdit,
  nameFallback,
  onDeleteClick,
  photosAndFloorPlans,
}: Props) {
  const classes = useClassNames("input-group", className);
  const deleteClasses = useClassNames({
    editing,
    loading,
  });
  return (
    <Fragment>
      <div className="space-title">
        <h3>{name || nameFallback}</h3>
        <CircularIconButton
          type="button"
          disabled={loading}
          aria-label="Delete"
          onClick={onDeleteClick}
          className={deleteClasses}>
          <Trash aria-hidden />
          <ActionButton
            aria-hidden
            tabIndex={-1}
            error={!!error}
            loading={loading}
            success={success}
          />
        </CircularIconButton>
      </div>
      <div className={classes}>{children}</div>
      <SpaceActions editing={editing} toggleEdit={toggleEdit} />
      <SpaceImages images={photosAndFloorPlans} />
    </Fragment>
  );
});

export { Controller } from "./Controller";

interface Props extends OptionalChildren, Omit<Required<ActionState>, "error"> {
  name: string;
  editing: boolean;
  nameFallback: string;
  className?: string;
  toggleEdit: Callback;
  onDeleteClick: Callback;
  error: string | boolean;
  photosAndFloorPlans: string[];
}
