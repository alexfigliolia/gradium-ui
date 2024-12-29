import { memo } from "react";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import { CreateTask } from "./CreateTask";
import { EditTask } from "./EditTask";
import { Filters } from "./Filters";
import { InlineFilters } from "./InlineFilters";
import { Maintenance } from "./Maintenance";
import "./styles.scss";

export default memo(
  function PropertyMaintenance(_: Propless) {
    return (
      <PermissedPropertyRoute
        fallback=".."
        requirements={AdminRoutes.access("PROPERTY_MAINTENACE")}>
        <Page className="maintenance-section">
          <PageTitle className="maintenance-title" title="Maintenance">
            <InlineFilters />
          </PageTitle>
          <Maintenance />
        </Page>
        <Filters />
        <EditTask />
        <CreateTask />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
