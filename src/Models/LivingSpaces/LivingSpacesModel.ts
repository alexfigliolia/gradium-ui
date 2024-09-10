import { BaseListCRUDModel } from "Tools/BaseListCrudModel";
import type { IUnit } from "./types";

export class LivingSpacesModel extends BaseListCRUDModel<IUnit> {
  constructor() {
    super("Living Spaces");
  }

  public get blank(): IUnit {
    return {
      name: "",
      type: "unit",
      beds: 0,
      baths: 0,
      images: [],
      floorPlans: [],
      footage: "",
    };
  }

  public validate(space?: IUnit) {
    if (!space) {
      return false;
    }
    return (
      space.name.length !== 0 &&
      space.type.length >= 4 &&
      !isNaN(space.beds) &&
      !isNaN(space.baths)
    );
  }
}
