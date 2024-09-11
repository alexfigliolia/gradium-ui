import type { ILessee } from "Models/Leases";

export interface ILeaseCRUD {
  unit: string;
  end: string;
  start: string;
  rate: string;
  lessees: Omit<ILessee, "id">[];
}
