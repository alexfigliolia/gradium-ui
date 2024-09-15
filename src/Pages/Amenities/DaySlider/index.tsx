import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useTimeout } from "@figliolia/react-hooks";
import type {
  Controller,
  FlickityOptions,
  IImage,
} from "Components/ImageSlider";
import { DEFAULT_OPTIONS, ImageSlider } from "Components/ImageSlider";
import {
  AmenitySchedule,
  selectCurrentDate,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import { Dates } from "Tools/Dates";
import type { Propless } from "Types/React";
import { DayButton } from "./DayButton";
import "./styles.scss";

const OPTIONS: FlickityOptions = {
  ...DEFAULT_OPTIONS,
  cellAlign: "left",
  contain: true,
};

export const DaySlider = memo(function DaySlider(_: Propless) {
  const timeout = useTimeout();
  const scrollTo = useRef(true);
  const controller = useRef<Controller>(null);
  const active = useAmenitySchedule(selectCurrentDate);
  const currentDay = useMemo(() => active.getDate(), [active]);
  const month = useMemo(() => Dates.localizedDaysInMonth(active), [active]);
  const selectDate = useCallback((date: Date) => {
    scrollTo.current = false;
    AmenitySchedule.selectDate(date);
  }, []);
  const children: IImage[] = useMemo(
    () =>
      month.map(date => {
        return {
          type: "child",
          content: (
            <DayButton
              {...date}
              key={date.localizedDate}
              selectDate={selectDate}
              active={currentDay === date.date}
            />
          ),
        };
      }),
    [month, currentDay, selectDate],
  );

  useEffect(() => {
    if (scrollTo.current) {
      timeout.execute(() => {
        controller.current?.scrollTo(currentDay - 1);
      }, 10);
    } else {
      scrollTo.current = true;
    }
  }, [currentDay, timeout]);

  const options = useMemo(
    () => ({ ...OPTIONS, initialIndex: currentDay - 1 }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ImageSlider
      ref={controller}
      images={children}
      options={options}
      className="day-slider"
    />
  );
});
