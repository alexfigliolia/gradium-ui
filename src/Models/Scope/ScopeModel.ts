import { userScope } from "GraphQL/Queries/userScope.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  BasicUser,
  LoggedInUser,
  PersonRoleType,
  UserScopeQuery,
  UserScopeQueryVariables,
} from "GraphQL/Types";
import { Accessor } from "./Accessor";

export class ScopeModel extends Accessor {
  constructor() {
    super("Scope", {
      id: -1,
      name: "",
      emails: [],
      affiliations: [],
      currentOrganizationId: -1,
      currentOrganizationName: "",
      currentPermissions: new Set(),
    });
  }

  public async initialize() {
    if (this.getState().id === -1) {
      await this.refetch();
    }
    return this.getState();
  }

  public updateBasicInfo({ name, emails }: BasicUser) {
    this.update(state => {
      state.name = name;
      state.emails = emails;
    });
  }

  public updateOrgName(name: string, orgID: number) {
    const update = [...this.getState().affiliations];
    for (const aff of update) {
      if (aff.organization.id === orgID) {
        aff.organization.name = name;
      }
    }
    this.update(state => {
      state.affiliations = update;
      if (orgID === state.currentOrganizationId) {
        state.currentOrganizationName = name;
      }
    });
  }

  public hasPermissions(...permissions: PersonRoleType[]) {
    const { currentPermissions } = this.getState();
    if (!currentPermissions.size && permissions.length) {
      return false;
    }
    for (const permission of permissions) {
      if (currentPermissions.has(permission)) {
        return true;
      }
    }
    return false;
  }

  public setState(scope: LoggedInUser) {
    this.update(state => {
      for (const key in scope) {
        // @ts-ignore
        state[key] = scope[key];
      }
    });
  }

  public async refetch() {
    const scope = await graphQLRequest<UserScopeQuery, UserScopeQueryVariables>(
      userScope,
      {},
    );
    this.setState(scope.userScope);
    const affiliation = scope.userScope.affiliations[0];
    if (!affiliation) {
      return;
    }
    this.setCurrentAffiliation(affiliation);
  }
}
