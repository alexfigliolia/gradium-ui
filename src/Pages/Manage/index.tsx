import { memo } from "react";
import { Outlet } from "react-router-dom";
import { useUnmount } from "@figliolia/react-hooks";
import { Page } from "Components/Page";
import { PermissedRoute } from "Components/PermissedRoute";
import { PropertyScopeModel } from "Models/PropertyScopeModel";
import { AdminRoutes } from "Router/AdminRoutes";
import { currentProperty, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { Tabs } from "./Tabs";
import "./styles.scss";

export default memo(
  function Manage(_: Propless) {
    const { name } = useProperties(currentProperty);
    useUnmount(() => {
      PropertyScopeModel.resetScope();
    });
    return (
      <PermissedRoute
        fallback="/app/properties"
        requirements={AdminRoutes.permissions("PROPERTY_MAINTENACE")}>
        <Page label={`Manage ${name}`} className="manage-property">
          <Tabs />
          <div className="outlet">
            <Outlet />
          </div>
        </Page>
      </PermissedRoute>
    );
  },
  () => true,
);
