import { memo, useMemo } from "react";
import { GradientButton } from "Components/GradientButton";
import { Page } from "Components/Page";
import { PermissedRoute } from "Components/PermissedRoute";
import { Clock } from "Icons/Clock";
import { AdminRoutes } from "Router/AdminRoutes";
import { Modals } from "State/Modals";
import { currentProperty, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { Filters } from "./Filters";
import { Financials } from "./Financials";
import Maintenance from "./Maintenance";
import { Occupancy } from "./Occupancy";
import "./styles.scss";

export default memo(
  function Dashboard(_: Propless) {
    const property = useProperties(currentProperty);
    const name = useMemo(
      () =>
        property.name.endsWith("s")
          ? `${property.name}'`
          : `${property.name}'s`,
      [property.name],
    );
    return (
      <PermissedRoute
        fallback="/app"
        requirements={AdminRoutes.permissions("ORGANIZATION_FINANCES")}>
        <Page
          className="dashboard"
          label={`${name} Dashboard`}
          titleArea={
            <GradientButton
              className="filter-button"
              onClick={Modals.dashboardFilters.open}>
              Filters <Clock aria-hidden />
            </GradientButton>
          }>
          <div className="stat-tiles">
            <Financials />
            <Occupancy />
            <Maintenance />
          </div>
        </Page>
        <Filters />
      </PermissedRoute>
    );
  },
  () => true,
);
