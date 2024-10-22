import { createContext } from "react";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type { Callback } from "Types/Generics";
import type {
  IConfigurableSpace,
  IConfigurableSpaceProps,
} from "Types/Gradium";
import { Controller } from "./Controller";
import { NullConfigurableSpaceModel } from "./NullConfigurableSpaceModel";

const NullModel = new NullConfigurableSpaceModel("Null");

export const CSFContext = createContext<
  ICSForm<IConfigurableSpace, ConfigurableSpaceModel>
>({
  item: {
    id: Infinity,
    name: "",
    images: [],
    floorPlans: [],
  },
  editing: false,
  onDelete: () => {},
  toggleEdit: () => {},
  model: NullModel,
  loading: false,
  success: false,
  error: false,
  controller: new Controller(NullModel, Infinity),
});

export interface ICSForm<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
> extends IConfigurableSpaceProps<T, M> {
  item: T;
  loading: boolean;
  success: boolean;
  error: boolean;
  editing: boolean;
  onDelete: Callback;
  toggleEdit: Callback;
  controller: Controller<T, M>;
}
