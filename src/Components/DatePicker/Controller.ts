import { Dates } from "Tools/Dates";
import type { IDate } from "./types";

export class Controller {
  public static dateFrom(value: string) {
    return Dates.isISODate(value)
      ? Dates.fromISODateString(value)
      : Dates.today();
  }

  public static createCalendar(year: number, month: number) {
    let dates = 0;
    let prefixes = 1;
    let current: IDate[] = [];
    const weeks: IDate[][] = [];
    const firstDayCurrent = new Date(year, month, 2).getDay();
    const lastDateCurrent = new Date(year, month + 1, 0).getDate();
    while (dates < lastDateCurrent) {
      if (prefixes < firstDayCurrent) {
        current.push({
          date: new Date(year, month, 0 - (firstDayCurrent - 1 - prefixes++)),
          className: "fade",
        });
      } else {
        current.push({ date: new Date(year, month, dates++ + 1) });
      }
      if (current.length === 7) {
        weeks.push(current.slice());
        current = [];
      }
    }
    const { length } = current;
    if (length) {
      for (let i = 1; i <= 7 - length; i++) {
        current.push({
          date: new Date(year, month + 1, i),
          className: "fade",
        });
      }
      weeks.push(current.slice());
      current = [];
    }
    return weeks;
  }
}
