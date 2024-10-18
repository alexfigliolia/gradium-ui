import type { ReactNode } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useController,
  useLoadingState,
  useUnmount,
} from "@figliolia/react-hooks";
import { CircularIconButton } from "Components/CircularIconButton";
import { LoadingState } from "Components/LoadingState";
import { Tile } from "Components/Tile";
import { Trash } from "Icons/Trash";
import type { BaseListCRUDModel } from "Tools/BaseListCrudModel";
import type { Callback } from "Types/Generics";
import type { IConfigurableSpace } from "Types/Gradium";
import { Controller } from "./Controller";
import { SpaceActions } from "./SpaceActions";
import { SpaceImages } from "./SpaceImages";
import "./styles.scss";

function ConfigurableSpaceFormComponent<
  T extends IConfigurableSpace,
  M extends BaseListCRUDModel<T>,
>({
  model,
  render,
  className,
  spaceDisplayName,
  ...rest
}: IConfigurableSpaceForm<T, M>) {
  const space = rest as unknown as T;
  const { id, name, images, floorPlans } = space;
  const { setState, resetState: _, ...actionState } = useLoadingState();
  const controller = useController(new Controller<T, typeof model>(model, id));
  controller.register(id, setState);
  const [editing, setEditing] = useState(!controller.model.validate(space));

  const allImages = useMemo(
    () => images.concat(floorPlans),
    [images, floorPlans],
  );

  const toggleEdit = useCallback(() => {
    setEditing(editing => !editing);
  }, []);

  const onTrashClick = useCallback(() => {
    controller.onTrashClick(space);
  }, [space, controller]);

  const inputClasses = useClassNames("input-group", className);

  const deleteClasses = useClassNames({
    editing,
    loading: actionState.loading,
  });

  useUnmount(() => {
    controller.destroy();
  });

  return (
    <Tile TagName="div" className="spaces">
      <div className="space-title">
        <h3>{name || `New ${spaceDisplayName}`}</h3>
        <CircularIconButton
          type="button"
          aria-label="Delete"
          onClick={onTrashClick}
          className={deleteClasses}
          disabled={actionState.loading}>
          <Trash aria-hidden />
          <LoadingState {...actionState} error={!!actionState.error} />
        </CircularIconButton>
      </div>
      <div className={inputClasses}>{render(controller, editing)}</div>
      <SpaceActions editing={editing} toggleEdit={toggleEdit} />
      <SpaceImages images={allImages} />
    </Tile>
  );
}

export const ConfigurableSpaceForm = memo(
  ConfigurableSpaceFormComponent,
) as unknown as typeof ConfigurableSpaceFormComponent;

export type IConfigurableSpaceForm<
  T extends IConfigurableSpace,
  M extends BaseListCRUDModel<T>,
> = T & {
  className?: string;
  model: M;
  spaceDisplayName: string;
  render: Callback<[controller: Controller<T, M>, editing: boolean], ReactNode>;
};

export type { Controller } from "./Controller";
