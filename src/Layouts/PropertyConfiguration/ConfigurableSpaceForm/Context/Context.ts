import { createContext } from "react";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type { Callback } from "Types/Generics";
import type {
  IConfigurableSpace,
  IConfigurableSpaceProps,
} from "Types/Gradium";
import type { OptionalChildren } from "Types/React";
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
  toggleEdit: () => {},
  model: NullModel,
  controller: new Controller(NullModel, Infinity),
});

export interface ICSForm<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
> extends IConfigurableSpaceProps<T, M>,
    OptionalChildren {
  item: T;
  editing: boolean;
  toggleEdit: Callback;
  controller: Controller<T, M>;
}
