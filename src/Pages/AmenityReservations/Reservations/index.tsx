import { memo, useEffect, useRef } from "react";
import { FadingLoader } from "Components/FadingLoader";
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
import { DayView } from "./DayView";
import "./styles.scss";

export const Reservations = memo(
  function Reservations(_: Propless) {
    const fade = useRef<(v: boolean) => void>(null);
    const loading = useAmenitySchedule(isLoading);
    const active = useAmenitySchedule(selectCurrentDate);
    const [day, month, year] = useLocalizedDate(active);

    useEffect(() => {
      fade.current?.(!loading);
    }, [loading]);

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
            <FadingLoader ref={fade} />
          </div>
          <DayView />
        </div>
      </Tile>
    );
  },
  () => true,
);
