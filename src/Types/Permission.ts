import type { PersonRoleType, PropertyAddonType } from "GraphQL/Types";

export interface AccessControl {
  permissions: PersonRoleType[];
  addons: PropertyAddonType[];
}
