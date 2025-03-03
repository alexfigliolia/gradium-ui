import { isBefore } from "date-fns";
import { useMemo } from "react";
import { Dates } from "Tools/Dates";

export const useDurationElapsed = <T extends { end: string; start: string }>({
  end,
  start,
}: T) => {
  const endDate = useMemo(() => new Date(end), [end]);
  const startDate = useMemo(() => new Date(start), [start]);
  const pending = useMemo(() => isBefore(new Date(), startDate), [startDate]);
  const formattedEndDate = useMemo(() => Dates.format(endDate), [endDate]);
  const formattedStartDate = useMemo(
    () => Dates.format(startDate),
    [startDate],
  );
  const diff = useMemo(
    () => endDate.getTime() - startDate.getTime(),
    [endDate, startDate],
  );
  const progress = useMemo(() => {
    if (pending) {
      return 3;
    }
    return ((new Date().getTime() - startDate.getTime()) / diff) * 100;
  }, [diff, startDate, pending]);
  return {
    endDate,
    startDate,
    formattedEndDate,
    formattedStartDate,
    progress,
    pending,
  };
};
