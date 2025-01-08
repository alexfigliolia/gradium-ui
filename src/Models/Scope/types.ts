import type { LoggedInUser, PersonRoleType } from "GraphQL/Types";

export interface IScope extends LoggedInUser {
  coreMobileMenu: boolean;
  currentOrganizationId: number;
  currentOrganizationName: string;
  currentPermissions: Set<PersonRoleType>;
}
