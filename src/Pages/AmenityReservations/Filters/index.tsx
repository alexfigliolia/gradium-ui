import { memo } from "react";
import { Confirmation } from "Components/Confirmation";
import { GradientButton } from "Components/GradientButton";
import {
  AmenitySchedule,
  filtersOpen,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import { FilterInputs } from "./FilterInputs";
import "./styles.scss";

export const Filters = memo(
  function Filters(_: Propless) {
    const open = useAmenitySchedule(filtersOpen);
    return (
      <Confirmation
        open={open}
        className="reservation-filters tight"
        close={AmenitySchedule.filters.close}>
        <h2>Reservation Filters</h2>
        <p>Filter by amenity or reserver</p>
        <FilterInputs />
        <GradientButton
          className="clear-filters"
          onClick={AmenitySchedule.resetFilters}>
          Clear Filters
        </GradientButton>
      </Confirmation>
    );
  },
  () => true,
);
