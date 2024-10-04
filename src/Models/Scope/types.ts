import type { LoggedInUser, PersonRoleType } from "GraphQL/Types";

export interface IScope extends LoggedInUser {
  currentOrganizationId: number;
  currentOrganizationName: string;
  currentPermissions: Set<PersonRoleType>;
}
