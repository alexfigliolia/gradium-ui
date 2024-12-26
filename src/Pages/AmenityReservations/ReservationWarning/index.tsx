import { memo } from "react";
import { Confirmation } from "Components/Confirmation";
import { GradientButton } from "Components/GradientButton";
import { AmenitySchedule, useAmenitySchedule } from "State/AmenitySchedule";
import "./styles.scss";

export const ReservationWarning = memo(function ReservationWarning() {
  const open = useAmenitySchedule(state => state.openReservationsWarning);
  return (
    <Confirmation
      open={open}
      className="reservation-warning tight"
      close={AmenitySchedule.reservationsWarning.close}>
      <h2>Amenity Reservations</h2>
      <p>
        In order to create new or modify existing reservations, you must have at
        least one amenity configured for this property
      </p>
      <GradientButton onClick={AmenitySchedule.reservationsWarning.close}>
        Close
      </GradientButton>
    </Confirmation>
  );
});
