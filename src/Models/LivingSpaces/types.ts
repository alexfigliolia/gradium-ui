import type { IListCRUDState } from "Tools/BaseListCrudModel";

export type IUnitType = "unit" | "dwelling";

export interface IUnit {
  name: string;
  type: IUnitType;
  beds: number;
  baths: number;
  images: string[];
  floorPlans: string[];
  footage: string;
}

export type ILivingSpaces = IListCRUDState<IUnit>;
