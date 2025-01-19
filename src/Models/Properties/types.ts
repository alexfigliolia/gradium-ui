import type { AdminBasicProperty, PropertyAddonType } from "GraphQL/Types";

export interface IProperties {
  current: number;
  loading: boolean;
  newProperty: false;
  currentAddons: Set<PropertyAddonType>;
  properties: Record<number, AdminBasicProperty>;
}
