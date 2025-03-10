import { createUseState } from "@figliolia/react-galena";
import type { ILivingSpaces } from "Models/LivingSpaces";
import { LivingSpacesModel } from "Models/LivingSpaces";

export const LivingSpaces = new LivingSpacesModel();
export const useLivingSpaces = createUseState(LivingSpaces);
export const fetching = (state: ILivingSpaces) => state.loading;
export const selectUnits = (state: ILivingSpaces) => Object.values(state.list);
export const selectDeletion = (
  state: ILivingSpaces,
): [boolean, number, string] => [
  state.confirmDelete,
  state.deleteItemId,
  state.deleteItemName,
];

export const selectLoading = (state: ILivingSpaces) => state.loading;
