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
      properties: {},
    });
  }

  public addProperty(property: AdminBasicProperty) {
    this.update(state => {
      state.properties = { ...state.properties, [property.id]: property };
    });
  }

  public initialize(organizationId: number, grants: Set<PersonRoleType>) {
    const permissions = new Permissions(grants);
    if (permissions.hasPermission(PersonRoleType.Maintenance)) {
      void this.fetchAdminScope(organizationId);
    } else if (permissions.hasPermission(PersonRoleType.Resident)) {
      // Get residence properties
    }
  }

  private async fetchAdminScope(organizationId: number) {
    const response = await graphQLRequest<
      AdminBasicPropertiesQuery,
      AdminBasicPropertiesQueryVariables
    >(adminBasicProperties, {
      organizationId,
    });
    this.update(state => {
      state.properties = response.adminBasicProperties;
    });
  }

  public toList() {
    return Object.values(this.getState().properties);
  }
}
