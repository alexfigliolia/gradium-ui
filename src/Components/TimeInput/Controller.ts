import type { ChangeEvent } from "react";
import { AssistedInput } from "Generics/AssistedInput";
import { Devices } from "Tools/Devices";

export class Controller extends AssistedInput {
  public onChangeMobile = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let time = value;
    if (value.length === 5) {
      time = `${value}:00`;
    }
    return time;
  };

  public format(locale: string, time: string) {
    if (Devices.IS_MOBILE_BROWSER) {
      return time;
    }
    if (!time) {
      return "";
    }
    return this.toDate(time).toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private toDate(time: string) {
    const now = new Date();
    const [hours, minutes, seconds] = time.split(":");
    if (hours) {
      now.setHours(parseInt(hours));
    }
    if (minutes) {
      now.setMinutes(parseInt(minutes));
    }
    if (seconds) {
      now.setSeconds(parseInt(seconds));
    }
    return now;
  }
}
