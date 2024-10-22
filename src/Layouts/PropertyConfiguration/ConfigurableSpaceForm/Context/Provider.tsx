import type { Provider } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type {
  IConfigurableSpace,
  IConfigurableSpaceProps,
} from "Types/Gradium";
import type { OptionalChildren } from "Types/React";
import { CSFContext, type ICSForm } from "./Context";
import type { Controller } from "./Controller";

function CSFContextRendererComponent<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
>({ children, ...rest }: Props<T, M>) {
  const Provider = useMemo(
    () => CSFContext.Provider as unknown as Provider<ICSForm<T, M>>,
    [],
  );

  const { controller, item } = rest;

  const [editing, setEditing] = useState(!controller.model.validate(item));

  const toggleEdit = useCallback(() => {
    setEditing(editing => !editing);
  }, []);

  const onDelete = useCallback(() => {
    controller.onTrashClick(item);
  }, [controller, item]);

  const value = useMemo(
    () => ({ ...rest, onDelete, editing, toggleEdit }),
    [rest, onDelete, editing, toggleEdit],
  );

  return <Provider value={value}>{children}</Provider>;
}

export const CSFContextProvider = memo(
  CSFContextRendererComponent,
) as typeof CSFContextRendererComponent;

interface Props<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
> extends OptionalChildren,
    IConfigurableSpaceProps<T, M> {
  item: T;
  controller: Controller<T, M>;
  loading: boolean;
  success: boolean;
  error: boolean;
}
