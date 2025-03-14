import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useController,
  useLoadingState,
  useMount,
  useUnmount,
} from "@figliolia/react-hooks";
import { Tile } from "Components/Tile";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import { useScrollToNode } from "Hooks/useScrollToNode";
import type {
  IConfigurableSpace,
  IConfigurableSpaceProps,
} from "Types/Gradium";
import type { OptionalChildren } from "Types/React";
import { Controller, CSFContextProvider } from "./Context";
import { CRUDActions } from "./CRUDActions";
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
  const [node, scrollTo] = useScrollToNode<HTMLDivElement>(32);
  const { setState, resetState: _, ...actionState } = useLoadingState();
  const controller = useController(new Controller<T, typeof model>(model, id));
  controller.register(id, setState);

  const inputClasses = useClassNames("input-group", className);

  useMount(() => {
    if (id < 0) {
      scrollTo();
    }
  });

  useUnmount(() => {
    controller.destroy();
  });

  return (
    <CSFContextProvider<T, M>
      item={item}
      model={model}
      controller={controller}
      {...actionState}
      error={!!actionState.error}>
      <Tile TagName="div" className="spaces" ref={node}>
        <div className="space-title">
          <h3>{name || `New ${spaceDisplayName}`}</h3>
          <CRUDActions />
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
) as typeof ConfigurableSpaceFormComponent;

export interface IConfigurableSpaceForm<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
> extends IConfigurableSpaceProps<T, M>,
    OptionalChildren {
  item: T & { dummy?: true };
  className?: string;
  spaceDisplayName: string;
}

export { FormSkeleton } from "./Skeleton";
export type { Controller, ICSForm } from "./Context";
export { CSFContext } from "./Context";
