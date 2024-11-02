import { createUseState } from "@figliolia/react-galena";
import type { IAmenitySchedule } from "Models/AmenitySchedule";
import { AmenityScheduleModel } from "Models/AmenitySchedule";

export const AmenitySchedule = new AmenityScheduleModel();
export const useAmenitySchedule = createUseState(AmenitySchedule);
export const selectReservations = (state: IAmenitySchedule) =>
  state.reservations;
export const openAndClose = (state: IAmenitySchedule) => [
  state.open,
  state.close,
];
export const isLoading = (state: IAmenitySchedule) => state.loading;
export const selectCurrentReservation = (state: IAmenitySchedule) =>
  state.currentReservation;
export const selectCurrentDate = (state: IAmenitySchedule) => state.currentDate;
export const datePicker = (state: IAmenitySchedule) => state.openDatePicker;
export const newReservation = (state: IAmenitySchedule) =>
  state.openNewReservation;
export const editReservation = (state: IAmenitySchedule) =>
  state.openEditReservation;
