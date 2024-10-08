import type { IThemeName } from "@figliolia/galena-dark-mode";
import { TypedStorage } from "@figliolia/typed-storage";

export const LocalStorage = new TypedStorage<{
  theme: IThemeName;
}>(localStorage);
