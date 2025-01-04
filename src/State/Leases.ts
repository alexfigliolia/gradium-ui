import { createUseState } from "@figliolia/react-galena";
import type { ILeases } from "Models/Leases";
import { LeasesModel } from "Models/Leases";

export const Leases = new LeasesModel();
export const useLeases = createUseState(Leases);

export const editing = (state: ILeases) => state.editLease;
export const creating = (state: ILeases) => state.newLease;
export const selectLeases = (state: ILeases) => state.leases;
export const leaseFilters = (state: ILeases): [boolean, ...rest: string[]] => [
  state.leaseFilters,
  state.space,
  state.startDate,
  state.endDate,
];
