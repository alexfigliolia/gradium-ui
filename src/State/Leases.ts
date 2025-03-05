import { createUseState } from "@figliolia/react-galena";
import type { ILeases } from "Models/Leases";
import { LeasesModel } from "Models/Leases";

export const Leases = new LeasesModel();
export const useLeases = createUseState(Leases);

export const editing = (state: ILeases) => state.editLease;
export const creating = (state: ILeases) => state.newLease;
export const scopedUnit = (state: ILeases) =>
  state.scopedUnit === -1 ? "" : state.scopedUnit.toString();
export const leaseFilters = (state: ILeases): [boolean, ...rest: string[]] => [
  state.leaseFilters,
  state.space,
  state.startDate,
  state.endDate,
];
