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
import { EnhancedSet } from "Tools/EnhancedSet";
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

  const amenitiesSelected = useMemo(
    () => EnhancedSet.toStringSet(activeAmenities),
    [activeAmenities],
  );

  const reserversSelected = useMemo(
    () => EnhancedSet.toStringSet(reservers),
    [reservers],
  );

  const onAmenitySelection = useCallback((selected: Set<string>) => {
    AmenitySchedule.filterByAmenity(EnhancedSet.toNumericSet(selected));
  }, []);

  const onPersonSelection = useCallback((selected: Set<string>) => {
    AmenitySchedule.filterByReserver(EnhancedSet.toNumericSet(selected));
  }, []);

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
