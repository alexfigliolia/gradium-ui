import { createUseState } from "@figliolia/react-galena";
import type { IProperties } from "Models/Properties";
import { PropertiesModel } from "Models/Properties";

export const Properties = new PropertiesModel();
export const useProperties = createUseState(Properties);

export const currentAddons = (state: IProperties) => state.currentAddons;

export const isLoading = (state: IProperties) => state.loading;

export const currentProperty = (state: IProperties) => {
  if (state.current in state.properties) {
    return state.properties[state.current];
  }
  if (state.loading) {
    return PropertiesModel.BLANK_PROPERTY;
  }
  throw new Error("Current Property is not set");
};

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

export const currentId = (state: IProperties) => state.current;
