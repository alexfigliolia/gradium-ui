import { createUseState } from "@figliolia/react-galena";
import type { IProperties } from "Models/Properties";
import { PropertiesModel } from "Models/Properties";

export const Properties = new PropertiesModel();
export const useProperties = createUseState(Properties);
export const allProperties = (state: IProperties) => {
  return Object.values(state.properties);
};
export const propertyNames = (state: IProperties) => {
  const names: string[] = [];
  for (const key in state.properties) {
    names.push(state.properties[key].name);
  }
  return names;
};
