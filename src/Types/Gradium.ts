import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import type { IListItem } from "Tools/BaseListCrudModel";

export type PropertySpaceType = "amenity" | "living-space";

export interface CloudinaryAssetScope {
  type: GradiumImageType;
  entityId: number;
}

export interface IConfigurableSpace extends IListItem {
  images: GradiumImage[];
  floorPlans: GradiumImage[];
}
