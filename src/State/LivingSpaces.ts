import { createUseState } from "@figliolia/react-galena";
import type { ILivingSpaces } from "Models/LivingSpaces";
import { LivingSpacesModel } from "Models/LivingSpaces";

export const LivingSpaces = new LivingSpacesModel();
export const useLivingSpaces = createUseState(LivingSpaces);
export const selectUnits = (state: ILivingSpaces) => state.list;
export const selectDeletion = (state: ILivingSpaces): [string, number] => [
  state.deleteItemName,
  state.deleteItemIndex,
];
