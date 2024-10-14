import { adminBasicPropertiesList } from "GraphQL/Queries/adminBasicPropertiesList.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  adminBasicPropertiesListQuery,
  adminBasicPropertiesListQueryVariables,
  AdminBasicProperty,
  PropertyAddon,
} from "GraphQL/Types";
import { PersonRoleType } from "GraphQL/Types";
import { BaseModel } from "Models/BaseModel";
import { Permission } from "Tools/Permission";
import type { IProperties } from "./types";

export class PropertiesModel extends BaseModel<IProperties> {
  constructor() {
    super("Properties", {
      current: -1,
      loading: false,
      properties: {},
      currentAddons: new Set(),
    });
  }

  public addProperty(property: AdminBasicProperty) {
    this.update(state => {
      state.properties = { ...state.properties, [property.id]: property };
    });
  }

  public async initialize(organizationId: number, grants: Set<PersonRoleType>) {
    const permissions = new Permission(grants);
    if (permissions.hasPermission(PersonRoleType.Maintenance)) {
      return this.fetchAdminScope(organizationId);
    }
    if (permissions.hasPermission(PersonRoleType.Resident)) {
      // Get residence properties
    }
    return null;
  }

  private async fetchAdminScope(organizationId: number) {
    this.loading();
    const response = await graphQLRequest<
      adminBasicPropertiesListQuery,
      adminBasicPropertiesListQueryVariables
    >(adminBasicPropertiesList, {
      organizationId,
    });
    const map: Record<number, AdminBasicProperty> = {};
    for (const property of response.adminBasicPropertiesList) {
      map[property.id] = property;
    }
    this.update(state => {
      state.properties = map;
      state.loading = false;
    });
    return map;
  }

  public toList() {
    return Object.values(this.getState().properties);
  }

  public setActiveProperty(nextSlug: string) {
    const { properties } = this.getState();
    for (const key in properties) {
      const { slug, id, addons } = properties[key];
      if (slug === nextSlug) {
        this.hashAddons(addons);
        return this.update(state => {
          state.current = id;
        });
      }
    }
    throw new Error("Property not found");
  }

  public loading(nextState = true) {
    this.update(state => {
      state.loading = nextState;
    });
  }

  public updateCurrentAddons(propertyId: number, addons: PropertyAddon[]) {
    this.update(state => {
      const property = state.properties[propertyId];
      state.properties = {
        ...state.properties,
        [propertyId]: {
          ...property,
          addons,
        },
      };
    });
    this.hashAddons(addons);
  }

  private hashAddons(addons: PropertyAddon[]) {
    this.update(state => {
      state.currentAddons = new Set(addons.map(a => a.type));
    });
  }
}
