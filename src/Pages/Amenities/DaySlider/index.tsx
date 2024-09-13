import { memo, useMemo } from "react";
import type { Callback } from "@figliolia/drag-detector";
import type { FlickityOptions, IImage } from "Components/ImageSlider";
import { DEFAULT_OPTIONS, ImageSlider } from "Components/ImageSlider";
import { Dates } from "Tools/Dates";
import { DayButton } from "./DayButton";
import "./styles.scss";

const OPTIONS: FlickityOptions = {
  ...DEFAULT_OPTIONS,
  cellAlign: "left",
  contain: true,
};

export const DaySlider = memo(function DaySlider({
  selectedDate,
  selectDay,
}: Props) {
  const currentDay = useMemo(() => selectedDate.getDate(), [selectedDate]);
  const month = useMemo(
    () => Dates.localizedDaysInMonth(selectedDate),
    [selectedDate],
  );
  const children: IImage[] = useMemo(
    () =>
      month.map(({ localizedDate, localizedDayShort, year, month, date }) => {
        return {
          type: "child",
          content: (
            <DayButton
              key={localizedDate}
              date={localizedDate}
              day={localizedDayShort}
              active={currentDay === date}
              onClick={() => selectDay(new Date(year, month, date))}
            />
          ),
        };
      }),
    [month, currentDay, selectDay],
  );
  return (
    <ImageSlider
      className="day-slider"
      images={children}
      options={{ ...OPTIONS, initialIndex: currentDay - 1 }}
    />
  );
});

interface Props {
  selectedDate: Date;
  selectDay: Callback<[date: Date]>;
}
