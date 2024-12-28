import { memo } from "react";
import { GradientButton } from "Components/GradientButton";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Add } from "Icons/Add";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { ManagementTasks } from "State/ManagementTasks";
import type { Propless } from "Types/React";
import { CreateTask } from "./CreateTask";
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
            <GradientButton onClick={ManagementTasks.createTask.open}>
              New Task
              <Add />
            </GradientButton>
          </PageTitle>
          <Maintenance />
        </Page>
        <CreateTask />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
