import { createUseState } from "@figliolia/react-galena";
import { ScopeModel } from "Models/Scope";

export const Scope = new ScopeModel();
export const useScope = createUseState(Scope);
