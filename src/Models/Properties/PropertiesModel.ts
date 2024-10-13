import { adminBasicProperties } from "GraphQL/Queries/adminBasicProperties.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  AdminBasicPropertiesQuery,
  AdminBasicPropertiesQueryVariables,
  AdminBasicProperty,
} from "GraphQL/Types";
import { PersonRoleType } from "GraphQL/Types";
import { BaseModel } from "Models/BaseModel";
import { Permissions } from "Tools/Permissions";
import type { IProperties } from "./types";

export class PropertiesModel extends BaseModel<IProperties> {
  constructor() {
    super("Properties", {
      current: -1,
      loading: false,
      properties: {},
    });
  }

  public addProperty(property: AdminBasicProperty) {
    this.update(state => {
      state.properties = { ...state.properties, [property.id]: property };
    });
  }

  public async initialize(organizationId: number, grants: Set<PersonRoleType>) {
    const permissions = new Permissions(grants);
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
      AdminBasicPropertiesQuery,
      AdminBasicPropertiesQueryVariables
    >(adminBasicProperties, {
      organizationId,
    });
    const map: Record<number, AdminBasicProperty> = {};
    for (const property of response.adminBasicProperties) {
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
      const { slug, id } = properties[key];
      if (slug === nextSlug) {
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
}
