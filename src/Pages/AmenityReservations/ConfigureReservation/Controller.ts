import type { Dispatch, SetStateAction } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { listPeople } from "GraphQL/Queries/listPeople.gql";
import type {
  Amenity,
  ListPeopleQuery,
  ListPeopleQueryVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Amenities } from "State/Amenities";
import { Scope } from "State/Scope";
import { Dates } from "Tools/Dates";
import type { Callback, Maybe } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

export class Controller {
  private hasSetEnd: boolean;
  private cancellable: boolean;
  public setAmenity: Callback<[string]>;
  public setReserver: Callback<[string]>;
  private setState: Dispatch<SetStateAction<UIState>>;
  constructor(
    setState: Dispatch<SetStateAction<UIState>>,
    cancellable: boolean,
  ) {
    this.setState = setState;
    this.hasSetEnd = cancellable;
    this.cancellable = cancellable;
    this.setAmenity = this.createSetter("amenityId");
    this.setReserver = this.createSetter("reserver");
  }

  public setStart = (start: string) => {
    if (this.cancellable) {
      return this.set("start", start);
    }
    if (!start) {
      this.set("start", start);
      this.set("end", start);
      this.hasSetEnd = false;
      return;
    }
    this.setState(ps => {
      let end = ps.end;
      if (!this.hasSetEnd) {
        const [hours, minutes] = start.split(":");
        if (hours === "23") {
          end = start;
        } else {
          end = `${parseInt(hours) + 1}:${minutes}:00`;
        }
      }
      return { ...ps, start, end };
    });
  };

  public setEnd = (end: string) => {
    this.hasSetEnd = true;
    this.set("end", end);
  };

  public destroy() {
    this.hasSetEnd = this.cancellable;
  }

  public set<K extends keyof UIState>(key: K, value: UIState[K]) {
    this.setState(ps => ({ ...ps, [key]: value }));
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

  public static fetchPeople = async (
    setState: ILoadingStateSetter,
    cursor?: Maybe<number>,
  ) => {
    const client = new UIClient({ setState });
    try {
      const response = await client.executeQuery<
        ListPeopleQuery,
        ListPeopleQueryVariables
      >(listPeople, {
        cursor,
        limit: 10,
        organizationId: Scope.getState().currentOrganizationId,
      });
      return {
        cursor: response.listPeople.cursor,
        list: response.listPeople.list.map(item => ({
          label: item.name,
          value: item.userId.toString(),
        })),
      };
    } catch (error) {
      // silence
    }
  };

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
