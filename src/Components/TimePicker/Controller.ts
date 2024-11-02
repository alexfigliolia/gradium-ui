import type { UIEvent } from "react";
import { Numbers } from "Tools/Numbers";
import type { Callback } from "Types/Generics";

export class Controller {
  public scrollTOD?: Callback<[number]>;
  public scrollHours?: Callback<[number]>;
  public scrollMinutes?: Callback<[number]>;

  public registerScrollTOD = this.createRef("scrollTOD");
  public registerScrollHours = this.createRef("scrollHours");
  public registerScrollMinutes = this.createRef("scrollMinutes");

  public createRef(key: "scrollTOD" | "scrollHours" | "scrollMinutes") {
    return (ref: Callback<[number]>) => {
      this[key] = ref;
    };
  }

  public initializePosition(hours: number, minutes: number, isPM: boolean) {
    if (this.scrollHours) {
      if (hours === 0) {
        this.scrollHours(11);
      } else {
        this.scrollHours((hours > 12 ? hours - 12 : hours) - 1);
      }
    }
    if (this.scrollMinutes) {
      this.scrollMinutes(minutes);
    }
    if (this.scrollTOD) {
      this.scrollTOD(isPM ? 1 : 0);
    }
  }

  public static parse(input: string, start: number, end: number) {
    try {
      const value = input.slice(start, end);
      const int = parseInt(value);
      if (isNaN(int)) {
        throw "fallback";
      }
      return int;
    } catch (error) {
      return 0;
    }
  }

  public static now() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    return this.toTimeString(
      Numbers.formatHoursOrMinutes(hours),
      Numbers.formatHoursOrMinutes(minutes),
    );
  }

  public static generateLocalizedMinutes(_: string, hours: number) {
    return Array.from({ length: 60 }, (_, i) => {
      const minutes = Numbers.formatHoursOrMinutes(i);
      return {
        label: minutes,
        value: this.toTimeString(hours, minutes),
      };
    });
  }

  public static generateLocalizedHours(
    _: string,
    minutes: number,
    isPM: boolean,
  ) {
    const list = Array.from({ length: 11 }, (_, i) => {
      const value = i + 1;
      const label = Numbers.formatHoursOrMinutes(value);
      return {
        label,
        value: this.toTimeString(isPM ? value + 12 : value, minutes),
      };
    });
    if (isPM) {
      list.push({
        label: Numbers.formatHoursOrMinutes(12),
        value: this.toTimeString(12, minutes),
      });
    } else {
      list.push({
        label: Numbers.formatHoursOrMinutes(12),
        value: this.toTimeString(0, minutes),
      });
    }
    return list;
  }

  public static generateTODs(hours: number, minutes: number, isPM: boolean) {
    return [
      {
        label: "AM",
        value: this.toTimeString(isPM ? hours - 12 : hours, minutes),
      },
      {
        label: "PM",
        value: this.toTimeString(isPM ? hours : hours + 12, minutes),
      },
    ];
  }

  public static onScroll(e: UIEvent<HTMLDivElement>) {
    if (!this.isScrollingDiv(e.target)) {
      return;
    }
    const { childNodes, scrollTop } = e.target;
    const children = childNodes as NodeListOf<HTMLTimeElement>;
    const first = children[0];
    if (!first) {
      return;
    }
    const { height } = first.getBoundingClientRect();
    const activeChild = children[Math.floor(scrollTop / height)];
    if (!activeChild) {
      return;
    }
    const value = activeChild.getAttribute("datetime");
    return value;
  }

  public static isScrollingDiv(target: EventTarget): target is HTMLDivElement {
    if ("tagName" in target && target.tagName === "DIV") {
      return true;
    }
    return false;
  }

  private static toTimeString(
    hours: string | number,
    minutes: string | number,
  ) {
    return `${typeof hours === "number" ? Numbers.formatHoursOrMinutes(hours) : hours}:${typeof minutes === "number" ? Numbers.formatHoursOrMinutes(minutes) : minutes}:00`;
  }
}
