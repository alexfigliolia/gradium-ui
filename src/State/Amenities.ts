import { createUseState } from "@figliolia/react-galena";
import type { IAmenities } from "Models/Amenities";
import { AmenitiesModel } from "Models/Amenities";

export const Amenities = new AmenitiesModel();
export const useAmenities = createUseState(Amenities);
export const selectAmenities = (state: IAmenities) => Object.values(state.list);
export const selectDeletion = (state: IAmenities): [string, number] => [
  state.deleteItemName,
  state.deleteItemId,
];
