import { createUseState } from "@figliolia/react-galena";
import { AmenityReservationModel } from "Models/AmenityReservation/AmenityReservationModel";

export const NewAmenityReservation = new AmenityReservationModel(
  "New Reservation",
);
export const EditAmenityReservation = new AmenityReservationModel(
  "Edit Reservation",
);
export const useNewReservation = createUseState(NewAmenityReservation);
export const useEditReservation = createUseState(EditAmenityReservation);
