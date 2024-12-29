import { Fragment, memo } from "react";
import { FilterButton } from "Components/FilterButton";
import {
  isLoading,
  ManagementTasks,
  totalActiveFilters,
  useTasks,
} from "State/ManagementTasks";
import type { Propless } from "Types/React";
import { FilterInputs } from "../Filters/FilterInputs";
import "./styles.scss";

export const InlineFilters = memo(function InlineFilters(_: Propless) {
  const loading = useTasks(isLoading);
  const active = useTasks(totalActiveFilters);
  return (
    <Fragment>
      <FilterButton
        loading={loading}
        totalActive={active}
        className="task-filter-button"
        onClick={ManagementTasks.filters.open}
      />
      <FilterInputs className="horizontal-filters" />
    </Fragment>
  );
});
