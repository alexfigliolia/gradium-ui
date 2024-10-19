import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type { IListItem } from "Generics/HashedListModel";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";

export type PropertySpaceType = "amenity" | "living-space";

export interface CloudinaryAssetScope {
  type: GradiumImageType;
  entityId: number;
}

export interface IConfigurableSpace extends IListItem {
  images: GradiumImage[];
  floorPlans: GradiumImage[];
}

export interface IConfigurableSpaceProps<
  T extends IConfigurableSpace,
  M extends ConfigurableSpaceModel<T>,
> {
  model: M;
}
