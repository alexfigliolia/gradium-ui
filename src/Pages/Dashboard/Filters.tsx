import { memo, useMemo } from "react";
import { DateFilters, FilterMenu } from "Components/FilterMenu";
import { GradientTransitionButton } from "Components/GradientTransitionButton";
import { Dashboard, selectDateRange, useDashboard } from "State/Dashboard";
import { Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";

export const Filters = memo(
  function Filters(_: Propless) {
    const open = useModals(state => state.dashboardFilters);
    const [start, end] = useDashboard(selectDateRange);
    const disabled = useMemo(() => !start && !end, [start, end]);
    return (
      <FilterMenu
        open={open}
        title="Filter Stats"
        close={Modals.dashboardFilters.close}>
        <DateFilters
          end={end}
          start={start}
          setEnd={Dashboard.setEnd}
          setStart={Dashboard.setStart}
        />
        <GradientTransitionButton
          label="Reset"
          disabled={disabled}
          onClick={Dashboard.resetDates}
        />
      </FilterMenu>
    );
  },
  () => true,
);
