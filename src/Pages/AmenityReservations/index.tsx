import { memo } from "react";
import { GradientButton } from "Components/GradientButton";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { AmenitySchedule } from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import { DateSelector } from "./DateSelector";
import { EditReservation } from "./EditReservation";
import { NewReservation } from "./NewReservation";
import { Reservations } from "./Reservations";
import "./styles.scss";

export default memo(
  function AmenityReservations(_: Propless) {
    return (
      <PermissedPropertyRoute
        fallback=".."
        requirements={AdminRoutes.access("PROPERTY_AMENITIES")}>
        <Page className="amenities-section">
          <PageTitle title="Amenity Reservations">
            <GradientButton onClick={AmenitySchedule.newReservation.open}>
              New
            </GradientButton>
          </PageTitle>
          <Reservations />
        </Page>
        <DateSelector />
        <NewReservation />
        <EditReservation />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
