import type { BasicProperty } from "GraphQL/Types";
import { BaseModel } from "Models/BaseModel";
import type { IProperties } from "./types";

export class PropertiesModel extends BaseModel<IProperties> {
  constructor() {
    super("Properties", {
      properties: {},
    });
  }

  public addProperty(property: BasicProperty) {
    this.update(state => {
      state.properties = { ...state.properties, [property.id]: property };
    });
  }

  public toList() {
    return Object.values(this.getState().properties);
  }
}
