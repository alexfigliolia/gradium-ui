import { BaseListCRUDModel } from "Tools/BaseListCrudModel";
import type { IAmenity } from "./types";

export class AmenitiesModel extends BaseListCRUDModel<IAmenity> {
  constructor() {
    super("Amenity Spaces");
  }

  public get blank(): IAmenity {
    return {
      name: "",
      open: "12am",
      close: "12am",
      images: [],
      floorPlans: [],
      footage: "",
      price: "",
      billed: "hour",
    };
  }

  public validate(amenity?: IAmenity) {
    if (!amenity) {
      return false;
    }
    return (
      amenity.name.length !== 0 &&
      amenity.footage.length !== 0 &&
      amenity.price.length !== 0
    );
  }
}
