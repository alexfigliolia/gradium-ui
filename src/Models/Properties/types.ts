import type {
  AdminBasicProperty,
  GradiumImage,
  PropertyAddonType,
} from "GraphQL/Types";

export interface IProperties {
  current: number;
  loading: boolean;
  newProperty: false;
  currentAddons: Set<PropertyAddonType>;
  properties: Record<number, PropertyWithNullImages>;
}

export interface PropertyWithNullImages
  extends Omit<AdminBasicProperty, "images"> {
  images: (GradiumImage | undefined)[];
}
