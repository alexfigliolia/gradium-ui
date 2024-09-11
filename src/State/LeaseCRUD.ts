import { createUseState } from "@figliolia/react-galena";
import type { ILeaseCRUD } from "Models/LeaseCRUD";
import { LeaseCRUDModel } from "Models/LeaseCRUD";
import type { ILessee } from "Models/Leases";

export const NewLease = new LeaseCRUDModel("New Lease");
export const EditLease = new LeaseCRUDModel("Update Lease");
export const useNewLease = createUseState(NewLease);
export const useUpdateLease = createUseState(EditLease);
export const selectFormValues = (
  state: ILeaseCRUD,
): [string, string, string, string, Omit<ILessee, "id">[]] => [
  state.unit,
  state.rate,
  state.start,
  state.end,
  state.lessees,
];
