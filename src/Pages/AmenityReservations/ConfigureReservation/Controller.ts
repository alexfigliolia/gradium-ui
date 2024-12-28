import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Amenity } from "GraphQL/Types";
import { Amenities } from "State/Amenities";
import { Dates } from "Tools/Dates";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

export class Controller {
  public setAmenity: Callback<[string]>;
  public setReserver: Callback<[string]>;
  private setState: Dispatch<SetStateAction<UIState>>;
  public setEnd: Callback<[ChangeEvent<HTMLInputElement>]>;
  public setStart: Callback<[ChangeEvent<HTMLInputElement>]>;
  constructor(setState: Dispatch<SetStateAction<UIState>>) {
    this.setState = setState;
    this.setEnd = this.createTimeParser("end");
    this.setStart = this.createTimeParser("start");
    this.setAmenity = this.createSetter("amenityId");
    this.setReserver = this.createSetter("reserver");
  }

  public set<K extends keyof UIState>(key: K, value: UIState[K]) {
    this.setState(ps => ({ ...ps, [key]: value }));
  }

  public createTimeParser(key: "start" | "end") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      let { value } = e.target;
      if (value.length === 5) {
        value = `${value}:00`;
      }
      this.setState(ps => ({ ...ps, [key]: value }));
    };
  }

  public createSetter<K extends keyof UIState>(key: K) {
    return (value: UIState[K]) => {
      this.setState(ps => ({ ...ps, [key]: value }));
    };
  }

  public static getState(list: IHTMLOption[]) {
    if (list.length === 1) {
      return list[0].value;
    }
    return "";
  }

  public static toHTML(amenities: Amenity[]) {
    return amenities.map(v => ({ label: v.name, value: v.id.toString() }));
  }

  public static computeCost(
    price: number,
    billed: string,
    start: string,
    end: string,
  ) {
    if (!start || !end || !price) {
      return 0;
    }
    const MS = this.timeToInt(end) - this.timeToInt(start);
    if (MS <= 0) {
      return 0;
    }
    const total = price * (MS / this.getBilledDuration(billed));
    if (isNaN(total)) {
      return 0;
    }
    return total;
  }

  public static toIdentifier(id: string) {
    return parseInt(id || "-1");
  }

  public static getMeta(amenityID: string): [string, number, string] {
    return [
      this.getName(amenityID),
      this.getPrice(amenityID),
      this.getBilled(amenityID),
    ];
  }

  private static getName(amenityID: string) {
    return this.parse(amenityID, "name", v => v || "");
  }

  private static getPrice(amenityID: string) {
    return this.parse(amenityID, "price", v => parseFloat(v || "0"));
  }

  private static getBilled(amenityID: string) {
    return this.parse(amenityID, "billed", v => v || "");
  }

  private static parse<K extends keyof Amenity, R>(
    amenityID: string,
    key: K,
    transform: (v?: Amenity[K]) => R,
  ) {
    return transform(Amenities.getById(parseInt(amenityID))?.[key]);
  }

  private static timeToInt(value: string) {
    const [hours, minutes] = value.split(":");
    const d = new Date();
    d.setHours(parseInt(hours));
    d.setMinutes(parseInt(minutes));
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d.getTime();
  }

  private static getBilledDuration(value: string) {
    if (value === "hour") {
      return Dates.ONE_HOUR;
    }
    return Dates.ONE_DAY;
  }
}

export interface UIState {
  end: string;
  start: string;
  charge: string;
  reserver: string;
  amenityId: string;
}
