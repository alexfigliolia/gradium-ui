import { useMemo } from "react";
import { Dates } from "Tools/Dates";

export const useLocalizedDate = (date: Date): [string, string, string] => {
  return useMemo(
    () => [
      Dates.toLocale(date, { day: "numeric" }),
      Dates.toLocale(date, { month: "long" }),
      Dates.toLocale(date, { year: "numeric" }),
    ],
    [date],
  );
};
