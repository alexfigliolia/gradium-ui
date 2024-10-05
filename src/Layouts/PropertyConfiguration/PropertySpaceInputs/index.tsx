import { Fragment, memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { CircularIconButton } from "Components/CircularIconButton";
import { Trash } from "Icons/Trash";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import { SpaceActions } from "./SpaceActions";
import { SpaceImages } from "./SpaceImages";
import "./styles.scss";

export const PropertySpaceInputs = memo(function PropertySpaceInputs({
  name,
  editing,
  children,
  className,
  onEditClick,
  nameFallback,
  onDeleteClick,
  photosAndFloorPlans,
}: Props) {
  const classes = useClassNames("input-group", className);
  const deleteClasses = useClassNames({ editing });
  return (
    <Fragment>
      <div className="space-title">
        <h3>{name || nameFallback}</h3>
        <CircularIconButton
          type="button"
          aria-label="Delete"
          className={deleteClasses}
          onClick={onDeleteClick}>
          <Trash aria-hidden />
        </CircularIconButton>
      </div>
      <div className={classes}>{children}</div>
      <SpaceActions editing={editing} edit={onEditClick} />
      <SpaceImages images={photosAndFloorPlans} />
    </Fragment>
  );
});

export { Controller } from "./Controller";

interface Props extends OptionalChildren {
  name: string;
  nameFallback: string;
  editing: boolean;
  className?: string;
  onDeleteClick: Callback;
  onEditClick: Callback;
  photosAndFloorPlans: string[];
}
