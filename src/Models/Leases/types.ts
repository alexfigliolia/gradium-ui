import type { LivingSpace } from "GraphQL/Types";

export type ILeaseStatus =
  | "complete"
  | "in-progress"
  | "terminated"
  | "pending";

export interface ILessee {
  id: string;
  name: string;
  email: string;
}

export interface ILease {
  id: number;
  end: string;
  start: string;
  rate: number;
  status: ILeaseStatus;
  space: Pick<LivingSpace, "name" | "type">;
  lessees: ILessee[];
}

export interface ILeases {
  page: number;
  maxPage: number;
  leases: ILease[];
  space: string;
  endDate: string;
  startDate: string;
  newLease: boolean;
  editLease: boolean;
  leaseFilters: boolean;
}
