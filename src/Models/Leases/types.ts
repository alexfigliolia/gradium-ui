import type { IUnit } from "Models/LivingSpaces";

export type ILeaseStatus =
  | "complete"
  | "in-progress"
  | "terminated"
  | "pending";

export interface ILease {
  id: number;
  end: string;
  start: string;
  rate: number;
  status: ILeaseStatus;
  space: Pick<IUnit, "name" | "type">;
}

export interface ILeases {
  page: number;
  maxPage: number;
  leases: ILease[];
  space: string;
  endDate: string;
  startDate: string;
}
