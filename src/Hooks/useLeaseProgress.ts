import { isBefore } from "date-fns";
import { useMemo } from "react";
import type { ILease } from "Models/Leases";
import { Dates } from "Tools/Dates";
import { Numbers } from "Tools/Numbers";

export const useLeaseProgress = ({ rate, end, start }: ILease) => {
  const price = useMemo(() => Numbers.format(rate), [rate]);
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
    price,
    endDate,
    startDate,
    formattedEndDate,
    formattedStartDate,
    progress,
    pending,
  };
};
