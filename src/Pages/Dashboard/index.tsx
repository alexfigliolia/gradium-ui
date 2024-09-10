import { Fragment, memo, useMemo } from "react";
import { GradientButton } from "Components/GradientButton";
import { Page } from "Components/Page";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import { Clock } from "Icons/Clock";
import { Modals } from "State/Modals";
import type { Propless } from "Types/React";
import { Filters } from "./Filters";
import { Financials } from "./Financials";
import Maintenance from "./Maintenance";
import { Occupancy } from "./Occupancy";
import "./styles.scss";

export default memo(
  function Dashboard(_: Propless) {
    const property = useCurrentProperty();
    const name = useMemo(
      () =>
        property.name.endsWith("s")
          ? `${property.name}'`
          : `${property.name}'s`,
      [property.name],
    );
    return (
      <Fragment>
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
      </Fragment>
    );
  },
  () => true,
);
