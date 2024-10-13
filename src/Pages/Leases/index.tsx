import { memo, useCallback } from "react";
import { GradientButton } from "Components/GradientButton";
import { LeaseRemaining } from "Components/LeaseRemaining";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { SearchBar } from "Components/SearchBar";
import { Add } from "Icons/Add";
import { Search } from "Icons/Search";
import { Page, PageTitle } from "Layouts/Management";
import type { ILease } from "Models/Leases";
import { AdminRoutes } from "Router/AdminRoutes";
import { NewLease } from "State/LeaseCRUD";
import { Modals } from "State/Modals";
import type { Propless } from "Types/React";
import { Filters } from "./Filters";
import { LeaseCreator } from "./LeaseCreator";
import { LeaseList } from "./LeaseList";
import { LeaseModifier } from "./LeaseModifier";
import { SpaceList } from "./SpaceList";
import "./styles.scss";

const progressRenderer = (lease: ILease) => (
  <LeaseRemaining {...lease} labelFN={endDate => `Available on ${endDate}`} />
);

export default memo(function Leases(_: Propless) {
  const openNewLease = useCallback(() => {
    NewLease.reset();
    Modals.newLease.open();
  }, []);
  return (
    <PermissedPropertyRoute
      fallback=".."
      requirements={AdminRoutes.access("PROPERTY_LEASES")}>
      <Page className="leases-section">
        <PageTitle title="Available Spaces" className="lease-title">
          <SearchBar placeholder="Search" />
        </PageTitle>
        <SpaceList />
        <PageTitle title="Available Soon" className="lease-title">
          <SearchBar placeholder="Search" />
        </PageTitle>
        <SpaceList className="soon" childFN={progressRenderer} />
        <PageTitle title="Leases" className="lease-title">
          <GradientButton onClick={openNewLease}>
            <Add />
          </GradientButton>
          <GradientButton onClick={Modals.leaseFilters.open}>
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
