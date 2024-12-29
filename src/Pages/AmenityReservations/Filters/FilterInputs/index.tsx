import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { DropDown } from "Components/DropDown";
import { PeopleDropDown } from "Components/PeopleDropDown";
import { BasketballCourtFilled } from "Icons/BasketballCourt";
import { selectAmenities, useAmenities } from "State/Amenities";
import {
  AmenitySchedule,
  selectFilters,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import { ClearButton } from "./ClearButton";
import "./styles.scss";

export const FilterInputs = memo(function FilterInputs({ className }: Props) {
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

  const classes = useClassNames("reservation-filter-inputs", className);

  return (
    <div className={classes}>
      <DropDown
        multiple
        list={list}
        name="amenities"
        label="Amenities"
        title="Amenities"
        value={amenitiesSelected}
        onChange={onAmenitySelection}
        icon={<BasketballCourtFilled />}>
        <ClearButton
          active={!!amenitiesSelected.size}
          onClick={AmenitySchedule.clearAmenities}
        />
      </DropDown>
      <PeopleDropDown
        multiple
        name="reservers"
        label="Reserved By"
        title="Reserved By"
        value={reserversSelected}
        onChange={onPersonSelection}>
        <ClearButton
          active={!!reserversSelected.size}
          onClick={AmenitySchedule.clearReservers}
        />
      </PeopleDropDown>
    </div>
  );
});

interface Props {
  className?: string;
}
