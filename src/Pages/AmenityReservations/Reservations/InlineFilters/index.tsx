import { Fragment, memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { FilterButton } from "Components/FilterButton";
import { FilterInputs } from "Pages/AmenityReservations/Filters/FilterInputs";
import {
  AmenitySchedule,
  isLoading,
  totalActiveFilters,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import { isDarkMode, useTheme } from "State/Theme";
import type { Propless } from "Types/React";
import "./styles.scss";

export const InlineFilters = memo(function InlineFilters(_: Propless) {
  const dark = useTheme(isDarkMode);
  const loading = useAmenitySchedule(isLoading);
  const active = useAmenitySchedule(totalActiveFilters);
  const filterClasses = useClassNames("horizontal-filters", { dark });

  return (
    <Fragment>
      <FilterButton
        loading={loading}
        totalActive={active}
        className="reservation-filter-button"
        onClick={AmenitySchedule.filters.open}
      />
      <FilterInputs className={filterClasses} />
    </Fragment>
  );
});
