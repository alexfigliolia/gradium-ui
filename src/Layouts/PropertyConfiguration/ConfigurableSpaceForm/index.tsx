import { memo, useCallback, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useController,
  useLoadingState,
  useUnmount,
} from "@figliolia/react-hooks";
import { CircularIconButton } from "Components/CircularIconButton";
import { LoadingState } from "Components/LoadingState";
import { Tile } from "Components/Tile";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import { Trash } from "Icons/Trash";
import type {
  IConfigurableSpace,
  IConfigurableSpaceProps,
} from "Types/Gradium";
import type { OptionalChildren } from "Types/React";
import { Controller, CSFContextProvider } from "./Context";
import { SpaceActions } from "./SpaceActions";
import { SpaceImages } from "./SpaceImages";
import "./styles.scss";

function ConfigurableSpaceFormComponent<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
>({
  item,
  model,
  children,
  className,
  spaceDisplayName,
}: IConfigurableSpaceForm<T, M>) {
  const { id, name } = item;
  const { setState, resetState: _, ...actionState } = useLoadingState();
  const controller = useController(new Controller<T, typeof model>(model, id));
  controller.register(id, setState);
  const [editing, setEditing] = useState(!controller.model.validate(item));

  const toggleEdit = useCallback(() => {
    setEditing(editing => !editing);
  }, []);

  const onTrashClick = useCallback(() => {
    controller.onTrashClick(item);
  }, [item, controller]);

  const inputClasses = useClassNames("input-group", className);

  const deleteClasses = useClassNames({
    editing,
    loading: actionState.loading,
  });

  useUnmount(() => {
    controller.destroy();
  });

  return (
    <CSFContextProvider<T, M>
      item={item}
      model={model}
      editing={editing}
      toggleEdit={toggleEdit}
      controller={controller}>
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
        <div className={inputClasses}>{children}</div>
        <SpaceActions />
        <SpaceImages />
      </Tile>
    </CSFContextProvider>
  );
}

export const ConfigurableSpaceForm = memo(
  ConfigurableSpaceFormComponent,
) as unknown as typeof ConfigurableSpaceFormComponent;

export interface IConfigurableSpaceForm<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
> extends IConfigurableSpaceProps<T, M>,
    OptionalChildren {
  item: T;
  className?: string;
  spaceDisplayName: string;
}

export type { Controller, ICSForm } from "./Context";
export { CSFContext } from "./Context";
