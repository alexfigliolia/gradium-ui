import { useMemo } from "react";
import { Dates } from "Tools/Dates";

export const useTimeString = (input?: Date | string) => {
  return useMemo(() => (input ? Dates.dateToTime(input) : ""), [input]);
};
