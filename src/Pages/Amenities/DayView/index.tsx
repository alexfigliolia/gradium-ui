import { memo, useCallback, useEffect, useRef } from "react";
import type { EventClickArg } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import TimeGrid from "@fullcalendar/timegrid";
import {
  AmenitySchedule,
  selectCurrentDate,
  selectEvents,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import "./styles.scss";

export const DayView = memo(
  function DayView(_: Propless) {
    const calendar = useRef<FullCalendar>(null);
    const events = useAmenitySchedule(selectEvents);
    const active = useAmenitySchedule(selectCurrentDate);
    useEffect(() => {
      calendar.current?.getApi()?.gotoDate?.(active);
    }, [active]);
    const onClick = useCallback((e: EventClickArg) => {
      const { publicId } = e.event._def;
      const event = AmenitySchedule.getEvent(parseInt(publicId));
      if (event) {
        // Modals.editEvent.open()
      }
    }, []);
    return (
      <FullCalendar
        ref={calendar}
        height="auto"
        plugins={[TimeGrid]}
        initialView="timeGridDay"
        initialDate={active}
        events={events.map(e => ({
          id: e.id.toString(),
          title: e.amenity.name,
          start: e.start,
          end: e.end,
        }))}
        eventClick={onClick}
        slotEventOverlap={false}
        slotMinTime="10:00:00"
        slotMaxTime="22:00:00"
      />
    );
  },
  () => true,
);
