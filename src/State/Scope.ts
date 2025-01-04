import { createUseState } from "@figliolia/react-galena";
import { PersonRoleType } from "GraphQL/Types";
import type { IScope } from "Models/Scope";
import { ScopeModel } from "Models/Scope";

export const Scope = new ScopeModel();
export const useScope = createUseState(Scope);
export const selectUserId = (scope: IScope) => scope.id;
export const selectName = (scope: IScope) => scope.name;
export const selectEmails = (scope: IScope) => scope.emails;
export const selectTotalEmails = (scope: IScope) => scope.emails.length;
export const residentPermission = (scope: IScope) => {
  return scope.currentPermissions.has(PersonRoleType.Resident);
};
export const grants = (scope: IScope) => {
  return scope.currentPermissions;
};
