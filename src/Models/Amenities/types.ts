import type { GradiumImage } from "GraphQL/Types";
import type { IListCRUDState } from "Tools/BaseListCrudModel";

export type IBillFrequency = "hour" | "day";

export interface IAmenity {
  id: number;
  name: string;
  price: string;
  open: string;
  close: string;
  billed: IBillFrequency;
  images: GradiumImage[];
  floorPlans: GradiumImage[];
  footage: number;
}

export type IAmenities = IListCRUDState<IAmenity>;
