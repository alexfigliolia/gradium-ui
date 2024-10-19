import type { Provider } from "react";
import { memo, useMemo } from "react";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type { IConfigurableSpace } from "Types/Gradium";
import { CSFContext, type ICSForm } from "./Context";

function CSFContextRendererComponent<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
>({ children, ...rest }: ICSForm<T, M>) {
  const Provider = useMemo(
    () => CSFContext.Provider as unknown as Provider<ICSForm<T, M>>,
    [],
  );
  const value = useMemo(() => rest, [rest]);
  return <Provider value={value}>{children}</Provider>;
}

export const CSFContextProvider = memo(
  CSFContextRendererComponent,
) as typeof CSFContextRendererComponent;
