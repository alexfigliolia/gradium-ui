import { HashedListModel } from "Generics/HashedListModel";
import type { IAmenity } from "./types";

export class AmenitiesModel extends HashedListModel<IAmenity> {
  constructor() {
    super("Amenity Spaces");
  }

  public get blank(): IAmenity {
    return {
      id: -1,
      name: "",
      open: "12am",
      close: "12am",
      images: [],
      floorPlans: [],
      footage: 0,
      price: "",
      billed: "hour",
    };
  }

  public validate(amenity?: IAmenity) {
    if (!amenity) {
      return false;
    }
    return amenity.name.length !== 0 && amenity.price.length !== 0;
  }
}
