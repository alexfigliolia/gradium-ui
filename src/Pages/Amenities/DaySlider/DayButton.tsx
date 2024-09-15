import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "@figliolia/drag-detector";
import { GradientBorderButton } from "Components/GradientBorderButton";

export const DayButton = memo(function DayButton({
  year,
  month,
  date,
  active,
  selectDate,
  localizedDate,
  localizedDayShort,
}: Props) {
  const classes = useClassNames("day-button", { active });
  const onClick = useCallback(() => {
    selectDate(new Date(year, month, date));
  }, [selectDate, year, month, date]);
  return (
    <GradientBorderButton className={classes} onClick={onClick}>
      <span>{localizedDayShort}</span>
      <span>{localizedDate}</span>
    </GradientBorderButton>
  );
});

interface Props {
  ISO: string;
  year: number;
  date: number;
  month: number;
  active: boolean;
  localizedDay: string;
  localizedDate: string;
  localizedDayShort: string;
  selectDate: Callback<[date: Date]>;
}
