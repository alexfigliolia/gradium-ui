import { memo } from "react";
import { useUnmount } from "@figliolia/react-hooks";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { ManagementTasks } from "State/ManagementTasks";
import type { Propless } from "Types/React";
import { Archive } from "./Archive";
import { ConfirmDeleteExpense } from "./ConfirmDeleteExpense";
import { ConfirmDeleteTask } from "./ConfirmDeleteTask";
import { CreateExpense } from "./CreateExpense";
import { CreateTask } from "./CreateTask";
import { Filters } from "./Filters";
import { InlineFilters } from "./InlineFilters";
import { Maintenance } from "./Maintenance";
import { ViewExpense } from "./ViewExpense";
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
        <Archive />
        <Filters />
        <ViewTask />
        <ViewExpense />
        <CreateTask />
        <CreateExpense />
        <ConfirmDeleteTask />
        <ConfirmDeleteExpense />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
