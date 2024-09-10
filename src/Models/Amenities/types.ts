import type { IListCRUDState } from "Tools/BaseListCrudModel";

export type IBillFrequency = "hour" | "day";

export interface IAmenity {
  name: string;
  price: string;
  open: string;
  close: string;
  billed: IBillFrequency;
  images: string[];
  floorPlans: string[];
  footage: string;
}

export type IAmenities = IListCRUDState<IAmenity>;
