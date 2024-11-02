import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useFocusedKeyListener } from "@figliolia/react-hooks";
import type { EventClickArg } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import TimeGrid from "@fullcalendar/timegrid";
import {
  AmenitySchedule,
  openAndClose,
  selectCurrentDate,
  selectReservations,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import { Dates } from "Tools/Dates";
import type { Propless } from "Types/React";
import "./styles.scss";
/* eslint-disable jsx-a11y/click-events-have-key-events */

export const DayView = memo(
  function DayView(_: Propless) {
    const calendar = useRef<FullCalendar>(null);
    const events = useAmenitySchedule(selectReservations);
    const active = useAmenitySchedule(selectCurrentDate);
    const [open, close] = useAmenitySchedule(openAndClose);

    const calendarEvents = useMemo(
      () =>
        events.map(e => ({
          id: e.id.toString(),
          title: e.amenity.name,
          rawEvent: e,
          start: Dates.timeToDate(e.start, new Date(active)),
          end: Dates.timeToDate(e.end, new Date(active)),
          date: active,
        })),
      [events, active],
    );

    useEffect(() => {
      calendar.current?.getApi()?.gotoDate?.(active);
    }, [active]);

    const onEventClick = useCallback((e: EventClickArg) => {
      e.jsEvent.stopPropagation();
      const { rawEvent } = e.event._def.extendedProps;
      if (rawEvent) {
        AmenitySchedule.editReservation.open(rawEvent);
      }
    }, []);

    const keyboardAccessibility = useFocusedKeyListener(
      AmenitySchedule.newReservation.open,
      "Enter",
    );

    return (
      <div
        role="button"
        tabIndex={0}
        className="day-view"
        {...keyboardAccessibility.events}
        onClick={AmenitySchedule.newReservation.open}>
        <FullCalendar
          ref={calendar}
          height="auto"
          plugins={[TimeGrid]}
          initialView="timeGridDay"
          initialDate={active}
          events={calendarEvents}
          eventClick={onEventClick}
          slotEventOverlap={false}
          slotMinTime={open}
          slotMaxTime={close}
        />
      </div>
    );
  },
  () => true,
);
