import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type { IListItem } from "Generics/HashedListModel";
import type {
  GradiumDocumentType,
  GradiumImage,
  GradiumImageType,
} from "GraphQL/Types";

export type PropertySpaceType = "amenity" | "living-space";

export interface CloudinaryImageScope {
  type: GradiumImageType;
  entityId: number;
}

export interface CloudinaryDocumentScope {
  type: GradiumDocumentType;
  entityId: number;
}

export type CloudinaryScope<T extends "image" | "document"> = T extends "image"
  ? CloudinaryImageScope
  : CloudinaryDocumentScope;

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
