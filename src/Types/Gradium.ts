import type { GradiumImage, GradiumImageType } from "GraphQL/Types";

export type PropertySpaceType = "amenity" | "living-space";

export interface ISpaceImageRenderer {
  photos: GradiumImage[];
  floorPlans: GradiumImage[];
  type: PropertySpaceType;
}

export interface CloudinaryAssetScope {
  type: GradiumImageType;
  entityId: number;
}
