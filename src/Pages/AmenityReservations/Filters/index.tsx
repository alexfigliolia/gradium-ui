import { memo, useCallback, useMemo } from "react";
import { Confirmation } from "Components/Confirmation";
import { DropDown } from "Components/DropDown";
import { GradientButton } from "Components/GradientButton";
import { PeopleDropDown } from "Components/PeopleDropDown";
import { BasketballCourtFilled } from "Icons/BasketballCourt";
import { selectAmenities, useAmenities } from "State/Amenities";
import {
  AmenitySchedule,
  filtersOpen,
  selectFilters,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Filters = memo(
  function Filters(_: Propless) {
    const open = useAmenitySchedule(filtersOpen);
    const [activeAmenities, reservers] = useAmenitySchedule(selectFilters);
    const amenities = useAmenities(selectAmenities);
    const list = useMemo(
      () =>
        amenities.map(amenity => ({
          value: amenity.id.toString(),
          label: amenity.name,
        })),
      [amenities],
    );

    const toNumericSet = useCallback((set: Set<string>) => {
      return new Set([...set].map(s => parseInt(s)));
    }, []);

    const toStringSet = useCallback((set: Set<number>) => {
      return new Set([...set].map(s => s.toString()));
    }, []);

    const amenitiesSelected = useMemo(
      () => toStringSet(activeAmenities),
      [toStringSet, activeAmenities],
    );

    const reserversSelected = useMemo(
      () => toStringSet(reservers),
      [toStringSet, reservers],
    );

    const onAmenitySelection = useCallback(
      (selected: Set<string>) => {
        AmenitySchedule.filterByAmenity(toNumericSet(selected));
      },
      [toNumericSet],
    );

    const onPersonSelection = useCallback(
      (selected: Set<string>) => {
        AmenitySchedule.filterByReserver(toNumericSet(selected));
      },
      [toNumericSet],
    );

    return (
      <Confirmation
        open={open}
        className="reservation-filters tight"
        close={AmenitySchedule.filters.close}>
        <h2>Reservation Filters</h2>
        <p>Filter by amenity or reserver</p>
        <DropDown
          multiple
          list={list}
          name="amenities"
          label="Amenities"
          title="Amenities"
          value={amenitiesSelected}
          onChange={onAmenitySelection}
          icon={<BasketballCourtFilled />}
        />
        <PeopleDropDown
          multiple
          name="reservers"
          label="Reserved By"
          title="Reserved By"
          value={reserversSelected}
          onChange={onPersonSelection}
        />
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
