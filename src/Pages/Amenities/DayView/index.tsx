import { memo, useCallback, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import TimeGrid from "@fullcalendar/timegrid";
import type { IAmenitySchedule } from "Models/AmenitySchedule";
import { useAmenitySchedule } from "State/AmenitySchedule";
import "./styles.scss";

export const DayView = memo(function DayView({ selectedDate }: Props) {
  const day = useMemo(() => selectedDate.getDate(), [selectedDate]);
  const selector = useCallback(
    (state: IAmenitySchedule) => state.events[day] ?? [],
    [day],
  );
  const events = useAmenitySchedule(selector);
  return (
    <FullCalendar
      height="auto"
      plugins={[TimeGrid]}
      initialView="timeGridDay"
      events={events.map(e => ({
        title: e.amenity.name,
        start: e.start,
        end: e.end,
      }))}
      slotEventOverlap={false}
      slotMinTime="10:00:00"
      slotMaxTime="22:00:00"
    />
  );
});

interface Props {
  selectedDate: Date;
}
