import { Fragment, memo, useEffect, useRef } from "react";
import { FadingLoader } from "Components/FadingLoader";
import { FilterButton } from "Components/FilterButton";
import { FilterInputs } from "Pages/AmenityReservations/Filters/FilterInputs";
import { selectAmenities, useAmenities } from "State/Amenities";
import {
  AmenitySchedule,
  isLoading,
  totalActiveFilters,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Callback } from "Types/Generics";
import type { Propless } from "Types/React";
import "./styles.scss";

export const InlineFilters = memo(function InlineFilters(_: Propless) {
  const fade = useRef<Callback<[boolean]>>(null);
  const loading = useAmenitySchedule(isLoading);
  const amenities = useAmenities(selectAmenities);
  const active = useAmenitySchedule(totalActiveFilters);

  useEffect(() => {
    fade.current?.(!loading);
  }, [loading]);

  if (loading && amenities.length < 2) {
    return <FadingLoader ref={fade} />;
  }

  return (
    <Fragment>
      <FilterButton
        loading={loading}
        totalActive={active}
        className="reservation-filter-button"
        onClick={AmenitySchedule.filters.open}
      />
      <FilterInputs className="horizontal-filters" />
    </Fragment>
  );
});
