import { createUseState } from "@figliolia/react-galena";
import { PropertiesModel } from "Models/Properties";

export const Properties = new PropertiesModel();
export const useProperties = createUseState(Properties);
