import { memo, useCallback } from "react";
import { useUnmount } from "@figliolia/react-hooks";
import { GradientButton } from "Components/GradientButton";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Add } from "Icons/Add";
import { Search } from "Icons/Search";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { NewLease } from "State/LeaseCRUD";
import { Leases } from "State/Leases";
import type { Propless } from "Types/React";
import { AvailabilityContextProvider } from "./AvailabilitySection";
import { AvailableSoon } from "./AvailableSoon";
import { AvailableSpaces } from "./AvailableSpaces";
import { Filters } from "./Filters";
import { LeaseCreator } from "./LeaseCreator";
import { LeaseList } from "./LeaseList";
import { LeaseModifier } from "./LeaseModifier";
import "./styles.scss";

export default memo(function LeasesPage(_: Propless) {
  const openNewLease = useCallback(() => {
    NewLease.reset();
    Leases.newLease.open();
  }, []);

  useUnmount(() => {
    Leases.closeAll();
  });

  return (
    <PermissedPropertyRoute
      fallback=".."
      requirements={AdminRoutes.access("PROPERTY_LEASES")}>
      <Page className="leases-section">
        <AvailabilityContextProvider>
          <AvailableSpaces />
        </AvailabilityContextProvider>
        <AvailabilityContextProvider>
          <AvailableSoon />
        </AvailabilityContextProvider>
        <PageTitle title="Leases" className="lease-title">
          <GradientButton onClick={openNewLease}>
            <Add />
          </GradientButton>
          <GradientButton onClick={Leases.leaseFilters.open}>
            Search <Search />
          </GradientButton>
        </PageTitle>
        <LeaseList />
        <Filters />
        <LeaseCreator />
        <LeaseModifier />
      </Page>
    </PermissedPropertyRoute>
  );
});
