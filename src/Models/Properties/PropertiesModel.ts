import { State } from "@figliolia/galena";
import Building1 from "Images/building-1.jpg";
import Building2 from "Images/building-2.jpg";
import House1 from "Images/house.jpg";
import type { IProperties, IProperty } from "./types";

export class PropertiesModel extends State<IProperties> {
  constructor() {
    super("Properties", {
      properties: PropertiesModel.DATA,
    });
  }

  public toList() {
    return Object.values(this.getState().properties);
  }

  public static readonly DATA: Record<number, IProperty> = {
    1: {
      id: 1,
      name: "Grand Jersey",
      address1: "100 Grand Street",
      address2: "",
      city: "Jersey City",
      state: "New Jersey",
      zipCode: "434242",
      images: [Building1, Building2],
      rentableSpaces: 500,
      occupancyRate: 87,
      mapsLink:
        "https://www.google.com/maps/place/100+Grand+St,+Jersey+City,+NJ+07302/@40.7155615,-74.0407346,17z/data=!4m6!3m5!1s0x89c250af04fa3ea7:0x2a89e787b22ebbf4!8m2!3d40.7155575!4d-74.0381597!16s%2Fg%2F11cpk5mxs9?entry=ttu",
    },
    2: {
      id: 2,
      name: "Georgica",
      address1: "100 Georgica Street",
      address2: "",
      city: "East Hampton",
      state: "New York",
      zipCode: "43045",
      images: [House1],
      rentableSpaces: 1,
      occupancyRate: 100,
      mapsLink:
        "https://www.google.com/maps/place/112+Georgica+Close+Rd,+East+Hampton,+NY+11937/@40.949645,-72.2279723,17z/data=!3m1!4b1!4m6!3m5!1s0x89e8bb8e3ce1112b:0x46d0e5e10d24a826!8m2!3d40.949641!4d-72.2253974!16s%2Fg%2F11c14xpf8x?entry=ttu",
    },
  };
}
