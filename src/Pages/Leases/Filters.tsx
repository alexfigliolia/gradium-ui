import { memo, useMemo } from "react";
import { DateFilters, FilterMenu } from "Components/FilterMenu";
import { GradientTransitionButton } from "Components/GradientTransitionButton";
import { Input } from "Components/Input";
import { Building } from "Icons/Building";
import { leaseFilters, Leases, useLeases } from "State/Leases";
import type { Propless } from "Types/React";

export const Filters = memo(
  function Filters(_: Propless) {
    const [open, space, start, end] = useLeases(leaseFilters);
    const disabled = useMemo(
      () => !space && !start && !end,
      [space, start, end],
    );
    return (
      <FilterMenu
        open={open}
        title="Search Leases"
        close={Leases.leaseFilters.close}>
        <h3>By Space:</h3>
        <Input
          required
          type="text"
          label="Space Name"
          value={space}
          name="space-name"
          icon={<Building />}
          autoComplete="off"
          onChange={Leases.searchSpace}
        />
        <DateFilters
          end={end}
          start={start}
          setEnd={Leases.setEndDate}
          setStart={Leases.setStartDate}
        />
        <GradientTransitionButton
          label="Reset"
          disabled={disabled}
          onClick={Leases.resetFilters}
        />
      </FilterMenu>
    );
  },
  () => true,
);
