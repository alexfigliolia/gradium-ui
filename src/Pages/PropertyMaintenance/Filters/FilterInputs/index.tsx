import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { StaffDropDown } from "Components/StaffDropDown";
import type { ManagementTaskPriority } from "GraphQL/Types";
import { LowPriority } from "Icons/LowPriority";
import { Search } from "Icons/Search";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import {
  ManagementTasks,
  selectAssignmentFilter,
  selectPriorityFilter,
  selectSearchFilter,
  useTasks,
} from "State/ManagementTasks";
import { EnhancedSet } from "Tools/EnhancedSet";
import { ClearButton } from "./ClearButton";
import "./styles.scss";

export const FilterInputs = memo(function FilterInputs({ className }: Props) {
  const searchString = useTasks(selectSearchFilter);
  const activePriorities = useTasks(selectPriorityFilter);
  const activeAssignees = useTasks(selectAssignmentFilter);

  const assignees = useMemo(
    () => EnhancedSet.toStringSet(activeAssignees),
    [activeAssignees],
  );

  const onPrioritySelection = useCallback((selected: Set<string>) => {
    ManagementTasks.filterByPriority(
      new EnhancedSet(selected) as EnhancedSet<ManagementTaskPriority>,
    );
  }, []);

  const onPersonSelection = useCallback((selected: Set<string>) => {
    ManagementTasks.filterByAssignee(EnhancedSet.toNumericSet(selected));
  }, []);

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    ManagementTasks.search(e.target.value);
  }, []);

  const classes = useClassNames("task-filter-inputs", className);

  return (
    <div className={classes}>
      <Input
        type="text"
        name="search"
        label="Search"
        icon={<Search />}
        autoComplete="off"
        value={searchString || ""}
        onChange={onSearch}
      />
      <DropDown
        multiple
        list={DisplayController.priorityOptions}
        name="priorities"
        label="Priorities"
        title="Priorities"
        value={activePriorities}
        onChange={onPrioritySelection}
        icon={<LowPriority />}>
        <ClearButton
          active={!!activePriorities.size}
          onClick={ManagementTasks.clearPriorityFilter}
        />
      </DropDown>
      <StaffDropDown
        multiple
        name="assignees"
        label="Assigned To"
        title="Assigned To"
        value={assignees}
        onChange={onPersonSelection}>
        <ClearButton
          active={!!assignees.size}
          onClick={ManagementTasks.clearAssignmentFilter}
        />
      </StaffDropDown>
    </div>
  );
});

interface Props {
  className?: string;
}
