import { createUseState } from "@figliolia/react-galena";
import type { IAmenitySchedule } from "Models/AmenitySchedule";
import { AmenityScheduleModel } from "Models/AmenitySchedule";

export const AmenitySchedule = new AmenityScheduleModel();
export const useAmenitySchedule = createUseState(AmenitySchedule);
export const selectReservations = (state: IAmenitySchedule) =>
  state.reservations.filter(
    reservation =>
      !(
        (state.amenityIds.size &&
          !state.amenityIds.has(reservation.amenity.id)) ||
        (state.reservers.size && !state.reservers.has(reservation.person.id))
      ),
  );

export const openAndClose = (state: IAmenitySchedule) => [
  state.open,
  state.close,
];
export const isLoading = (state: IAmenitySchedule) => state.loading;
export const selectCurrentReservation = (state: IAmenitySchedule) =>
  state.currentReservation;
export const selectCurrentDate = (state: IAmenitySchedule) => state.currentDate;
export const datePicker = (state: IAmenitySchedule) => state.openDatePicker;
export const filtersOpen = (state: IAmenitySchedule) => state.filters;
export const newReservation = (state: IAmenitySchedule) =>
  state.openNewReservation;
export const editReservation = (state: IAmenitySchedule) =>
  state.openEditReservation;
export const selectFilters = (state: IAmenitySchedule) => [
  state.amenityIds,
  state.reservers,
];
export const totalActiveFilters = (state: IAmenitySchedule) =>
  state.amenityIds.size + state.reservers.size;
