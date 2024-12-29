import { memo } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Tile } from "Components/Tile";
import { useLocalizedDate } from "Hooks/useLocalizedDate";
import {
  AmenitySchedule,
  selectCurrentDate,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import { DayView } from "./DayView";
import { InlineFilters } from "./InlineFilters";
import "./styles.scss";

export const Reservations = memo(
  function Reservations(_: Propless) {
    const active = useAmenitySchedule(selectCurrentDate);
    const [day, month, year] = useLocalizedDate(active);
    return (
      <Tile className="schedule">
        <div className="calendar">
          <div className="title">
            <GradientBorderButton onClick={AmenitySchedule.datePicker.open}>
              <div>
                {month} {day}
                <strong>,&nbsp;&nbsp;&nbsp;{year}</strong>
              </div>
            </GradientBorderButton>
            <InlineFilters />
          </div>
          <DayView />
        </div>
      </Tile>
    );
  },
  () => true,
);
