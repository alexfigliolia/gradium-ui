import { memo } from "react";
import { useUnmount } from "@figliolia/react-hooks";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { SearchContextProvider } from "Components/SearchContext";
import { Page } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { Leases } from "State/Leases";
import type { Propless } from "Types/React";
import { AvailableSoon } from "./AvailableSoon";
import { AvailableSpaces } from "./AvailableSpaces";
import { CreateLease } from "./CreateLease";
import { LeasesList } from "./LeasesList";
import "./styles.scss";

export default memo(function LeasesPage(_: Propless) {
  useUnmount(() => {
    Leases.closeAll();
  });

  return (
    <PermissedPropertyRoute
      fallback=".."
      requirements={AdminRoutes.access("PROPERTY_LEASES")}>
      <Page className="leases-section">
        <SearchContextProvider>
          <AvailableSpaces />
          <CreateLease />
        </SearchContextProvider>
        <SearchContextProvider>
          <AvailableSoon />
        </SearchContextProvider>
        <SearchContextProvider>
          <LeasesList />
        </SearchContextProvider>
      </Page>
    </PermissedPropertyRoute>
  );
});
