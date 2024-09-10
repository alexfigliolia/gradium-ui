import { createUseState } from "@figliolia/react-galena";
import type { ILessee, INewLease } from "Models/NewLease";
import { NewLeaseModel } from "Models/NewLease";

export const NewLease = new NewLeaseModel();
export const useNewLease = createUseState(NewLease);
export const selectFormValues = (
  state: INewLease,
): [string, string, string, string, ILessee[]] => [
  state.unit,
  state.rate,
  state.start,
  state.end,
  state.lessees,
];
