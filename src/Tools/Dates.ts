import { addMonths, subMonths, subYears } from "date-fns";
import { LanguageHandler } from "./LanguageHandler";

export class Dates {
  public static TODAY = this.today();
  public static ONE_DAY = 1000 * 60 * 60 * 24;
  public static ONE_MONTH = this.ONE_DAY * 30;
  public static ONE_YEAR = this.ONE_DAY * 365;
  public static DAY_FORMATTER = new Intl.DateTimeFormat(
    window?.navigator?.language ?? "en-us",
    {
      day: "numeric",
    },
  );
  public static DATE_FORMATTER = new Intl.DateTimeFormat(
    window?.navigator?.language ?? "en-us",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  static {
    LanguageHandler.subscribe(() => {
      this.DAY_FORMATTER = new Intl.DateTimeFormat(
        window?.navigator?.language ?? "en-us",
        {
          day: "numeric",
        },
      );
      this.DATE_FORMATTER = new Intl.DateTimeFormat(
        window?.navigator?.language ?? "en-us",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
      );
    });
  }

  public static readonly rangePresets = {
    "Last Month": () => [subMonths(this.today(), 1), this.today()],
    "Last 6 Months": () => [subMonths(this.today(), 6), this.today()],
    "Last Year": () => [subYears(this.today(), 1), this.today()],
    "Last 2 Years": () => [subYears(this.today(), 2), this.today()],
  };

  public static format(date: Date) {
    return this.DATE_FORMATTER.format(date);
  }

  public static computeRange(
    preset: Extract<keyof (typeof Dates)["rangePresets"], string>,
  ) {
    return this.rangePresets[preset]();
  }

  public static localizedMonths() {
    return Array.from({ length: 12 }, (_, i) => {
      const now = this.today();
      now.setDate(1);
      now.setMonth(i);
      return now.toLocaleString(navigator.language, { month: "long" });
    });
  }

  public static localizedDays() {
    return Array.from({ length: 7 }, (_, i) => {
      const now = this.today();
      const day = now.getDay();
      now.setDate(now.getDate() + (i < day ? -day + i : i - day));
      return now.toLocaleString(navigator.language, { weekday: "long" });
    });
  }

  public static matchPreset(
    start: string,
    end: string,
  ): Extract<keyof (typeof Dates)["rangePresets"], string> | "" {
    const endDate = new Date(end);
    if (!this.isToday(endDate)) {
      return "";
    }
    const startDate = new Date(start);
    if (this.isMonthsApart(startDate, endDate, 1)) {
      return "Last Month";
    }
    if (this.isMonthsApart(startDate, endDate, 6)) {
      return "Last 6 Months";
    }
    if (this.isMonthsApart(startDate, endDate, 12)) {
      return "Last Year";
    }
    if (this.isMonthsApart(startDate, endDate, 24)) {
      return "Last 2 Years";
    }
    return "";
  }

  public static isISODate(str: string) {
    const D = new Date(str);
    if (!(D instanceof Date)) {
      return false;
    }
    const measuredTime = D.getTime();
    if (isNaN(measuredTime)) {
      return false;
    }
    const ISO = D.toISOString();
    const [_, time] = str.split("T");
    if (!time) {
      if (!/\d{4}-\d{2}-\d{2}/.test(str)) {
        return false;
      }
      return this.ISODateString(ISO) === str;
    }
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
      return false;
    }
    return ISO === str;
  }

  public static toISODateString(date: Date) {
    return this.ISODateString(date.toISOString());
  }

  public static ISODateString(ISO: string) {
    return ISO.split("T")[0];
  }

  public static isMonthsApart(date1: Date, date2: Date, N: number) {
    return addMonths(date1, N).getTime() === date2.getTime();
  }

  public static isToday(date: Date) {
    const today = this.today();
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  }

  public static getDay(date: Date) {
    return this.DAY_FORMATTER.format(date);
  }

  public static fromISODateString(str: string) {
    const [year, month, day] = this.parseISODateString(str);
    return new Date(year, month - 1, day);
  }

  public static today(d = new Date()) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  public static parseISODateString(str: string) {
    const date = this.ISODateString(str);
    return date.split("-").map(v => parseInt(v));
  }

  public static humanDiff(date1: Date, date2: Date) {
    const diff = date2.getTime() - date1.getTime();
    if (diff > this.ONE_YEAR) {
      const years = Math.floor(diff / this.ONE_YEAR);
      return `Over ${years} ${years === 1 ? "year" : "years"} remaining`;
    }
    if (diff >= this.ONE_MONTH) {
      const months = Math.floor(diff / this.ONE_MONTH);
      return `${months} ${months === 1 ? "month" : "months"} remaining`;
    }
    const days = Math.floor(diff / this.ONE_DAY);
    return `${days} ${days === 1 ? "day" : "days"} remaining`;
  }
}
