import { createUseState } from "@figliolia/react-galena";
import type { IAmenitySchedule } from "Models/AmenitySchedule";
import { AmenityScheduleModel } from "Models/AmenitySchedule";

export const AmenitySchedule = new AmenityScheduleModel();
export const useAmenitySchedule = createUseState(AmenitySchedule);
export const selectEvents = (state: IAmenitySchedule) => {
  return state.events[state.currentDate.getDate()] || [];
};
export const selectCurrentDate = (state: IAmenitySchedule) => state.currentDate;
