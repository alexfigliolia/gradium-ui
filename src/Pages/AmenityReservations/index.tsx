import { memo, useMemo } from "react";
import { GradientButton } from "Components/GradientButton";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { AmenitySchedule } from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import { DateSelector } from "./DateSelector";
import { EditReservation } from "./EditReservation";
import { NewReservation } from "./NewReservation";
import { proxyReservationModifier } from "./ProxyReservationModifier";
import { Reservations } from "./Reservations";
import { ReservationWarning } from "./ReservationWarning";
import "./styles.scss";

export default memo(
  function AmenityReservations(_: Propless) {
    const newReservation = useMemo(
      () => proxyReservationModifier(AmenitySchedule.newReservation.open),
      [],
    );
    return (
      <PermissedPropertyRoute
        fallback=".."
        requirements={AdminRoutes.access("PROPERTY_AMENITIES")}>
        <Page className="amenities-section">
          <PageTitle title="Amenity Reservations">
            <GradientButton onClick={newReservation}>New</GradientButton>
          </PageTitle>
          <Reservations />
        </Page>
        <DateSelector />
        <NewReservation />
        <EditReservation />
        <ReservationWarning />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
