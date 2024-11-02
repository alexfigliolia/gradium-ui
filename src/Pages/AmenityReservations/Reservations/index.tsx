import { memo } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Tile } from "Components/Tile";
import { useLocalizedDate } from "Hooks/useLocalizedDate";
import {
  AmenitySchedule,
  isLoading,
  selectCurrentDate,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import { SkeletonSchedule } from "../PageSkeleton";
import { DayView } from "./DayView";
import "./styles.scss";

export const Reservations = memo(
  function Reservations(_: Propless) {
    const loading = useAmenitySchedule(isLoading);
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
          </div>
          {loading ? <SkeletonSchedule /> : <DayView />}
        </div>
      </Tile>
    );
  },
  () => true,
);
