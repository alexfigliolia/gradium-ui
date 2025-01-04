import { memo, useCallback } from "react";
import { useUnmount } from "@figliolia/react-hooks";
import { GradientButton } from "Components/GradientButton";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { SearchBar } from "Components/SearchBar";
import { Add } from "Icons/Add";
import { Search } from "Icons/Search";
import { LeaseRemaining } from "Layouts/Leases";
import { Page, PageTitle } from "Layouts/Management";
import type { ILease } from "Models/Leases";
import { AdminRoutes } from "Router/AdminRoutes";
import { NewLease } from "State/LeaseCRUD";
import { Leases } from "State/Leases";
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
