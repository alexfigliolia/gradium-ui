import { memo, useMemo } from "react";
import { useUnmount } from "@figliolia/react-hooks";
import { GradientButton } from "Components/GradientButton";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { AmenitySchedule } from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import { LazyDialogs } from "./LazyDialogs";
import { proxyReservationModifier } from "./ProxyReservationModifier";
import { Reservations } from "./Reservations";
import "./styles.scss";

export default memo(
  function AmenityReservations(_: Propless) {
    const newReservation = useMemo(
      () => proxyReservationModifier(AmenitySchedule.newReservation.open),
      [],
    );

    useUnmount(() => {
      AmenitySchedule.closeAll();
    });

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
        <LazyDialogs />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
