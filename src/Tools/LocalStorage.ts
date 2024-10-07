import type { IThemeName } from "@figliolia/galena-dark-mode";
import { TypeSafeStorage } from "Generics/TypeSafeStorage";

export const LocalStorage = new TypeSafeStorage<{
  theme: IThemeName;
}>(localStorage);
