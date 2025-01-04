import { memo } from "react";
import { useUnmount } from "@figliolia/react-hooks";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { ManagementTasks } from "State/ManagementTasks";
import type { Propless } from "Types/React";
import { ConfirmDelete } from "./ConfirmDelete";
import { CreateTask } from "./CreateTask";
import { Filters } from "./Filters";
import { InlineFilters } from "./InlineFilters";
import { Maintenance } from "./Maintenance";
import { ViewTask } from "./ViewTask";
import "./styles.scss";

export default memo(
  function PropertyMaintenance(_: Propless) {
    useUnmount(() => {
      ManagementTasks.closeAll();
    });

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
        <ViewTask />
        <CreateTask />
        <ConfirmDelete />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
