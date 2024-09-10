import { createUseState } from "@figliolia/react-galena";
import type { ILeases } from "Models/Leases";
import { LeasesModel } from "Models/Leases";

export const Leases = new LeasesModel();
export const useLeases = createUseState(Leases);

export const selectLeases = (state: ILeases) => state.leases;
export const leaseFilters = (state: ILeases) => [
  state.space,
  state.startDate,
  state.endDate,
];
