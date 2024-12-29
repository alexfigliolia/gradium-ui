import { memo } from "react";
import { Confirmation } from "Components/Confirmation";
import { GradientButton } from "Components/GradientButton";
import { filtersOpen, ManagementTasks, useTasks } from "State/ManagementTasks";
import type { Propless } from "Types/React";
import { FilterInputs } from "./FilterInputs";
import "./styles.scss";

export const Filters = memo(
  function Filters(_: Propless) {
    const open = useTasks(filtersOpen);
    return (
      <Confirmation
        open={open}
        className="task-filters tight"
        close={ManagementTasks.filters.close}>
        <h2>Task Filters</h2>
        <p>Filter by assignee, priority, or search task descriptions</p>
        <FilterInputs />
        <GradientButton
          className="clear-filters"
          onClick={ManagementTasks.resetAllFilters}>
          Clear Filters
        </GradientButton>
      </Confirmation>
    );
  },
  () => true,
);
