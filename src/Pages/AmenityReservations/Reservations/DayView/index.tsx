import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useFocusedKeyListener } from "@figliolia/react-hooks";
import type { EventClickArg } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import TimeGrid from "@fullcalendar/timegrid";
import { useTimeString } from "Hooks/useTimeString";
import { proxyReservationModifier } from "Pages/AmenityReservations/ProxyReservationModifier";
import {
  AmenitySchedule,
  openAndClose,
  selectCurrentDate,
  selectReservations,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import "./styles.scss";
/* eslint-disable jsx-a11y/click-events-have-key-events */

export const DayView = memo(
  function DayView(_: Propless) {
    const calendar = useRef<FullCalendar>(null);
    const events = useAmenitySchedule(selectReservations);
    const active = useAmenitySchedule(selectCurrentDate);
    const [openISO, closeISO] = useAmenitySchedule(openAndClose);
    const open = useTimeString(openISO);
    const close = useTimeString(closeISO);

    const calendarEvents = useMemo(
      () =>
        events.map(e => ({
          id: e.id.toString(),
          title: e.amenity.name,
          rawEvent: e,
          start: e.start,
          end: e.end,
          date: active,
        })),
      [events, active],
    );

    useEffect(() => {
      calendar.current?.getApi()?.gotoDate?.(active);
    }, [active]);

    const newReservation = useMemo(
      () => proxyReservationModifier(AmenitySchedule.newReservation.open),
      [],
    );

    const editReservation = useMemo(
      () => proxyReservationModifier(AmenitySchedule.editReservation.open),
      [],
    );

    const onEventClick = useCallback(
      (e: EventClickArg) => {
        e.jsEvent.stopPropagation();
        const { rawEvent } = e.event._def.extendedProps;
        if (rawEvent) {
          editReservation(rawEvent);
        }
      },
      [editReservation],
    );

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
        onClick={newReservation}>
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
