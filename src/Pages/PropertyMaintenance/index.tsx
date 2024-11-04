import { memo } from "react";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import { Maintenance } from "./Maintenance";

export default memo(
  function PropertyMaintenance(_: Propless) {
    return (
      <PermissedPropertyRoute
        fallback=".."
        requirements={AdminRoutes.access("PROPERTY_MAINTENACE")}>
        <Page className="maintenance-section">
          <PageTitle title="Maintenance" />
          <Maintenance />
        </Page>
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
