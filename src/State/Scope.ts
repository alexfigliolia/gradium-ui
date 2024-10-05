import { createUseState } from "@figliolia/react-galena";
import type { IScope } from "Models/Scope";
import { ScopeModel } from "Models/Scope";

export const Scope = new ScopeModel();
export const useScope = createUseState(Scope);
export const selectUserId = (scope: IScope) => scope.id;
export const selectEmails = (scope: IScope) => scope.emails;
