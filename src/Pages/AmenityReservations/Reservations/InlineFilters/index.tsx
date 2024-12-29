import { Fragment, memo, useEffect, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ColoredLoadingState } from "Components/ColoredLoadingState";
import { FadingLoader } from "Components/FadingLoader";
import { IconButton } from "Components/IconButton";
import { Filters } from "Icons/Filters";
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
  const classes = useClassNames("filter-button", { loading });
  const indicatorClasses = useClassNames("indicator", { active: !!active });

  useEffect(() => {
    fade.current?.(!loading);
  }, [loading]);

  if (loading && amenities.length < 2) {
    return <FadingLoader ref={fade} />;
  }

  return (
    <Fragment>
      <IconButton className={classes} onClick={AmenitySchedule.filters.open}>
        <Filters />
        <div className={indicatorClasses}>
          <strong>{active}</strong>
        </div>
        <ColoredLoadingState loading={loading} />
      </IconButton>
      <FilterInputs className="horizontal-filters" />
    </Fragment>
  );
});
