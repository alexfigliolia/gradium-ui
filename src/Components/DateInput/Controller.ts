import { AssistedInput } from "Generics/AssistedInput";
import { Dates } from "Tools/Dates";
import { Devices } from "Tools/Devices";

export class Controller extends AssistedInput {
  public static format(value: string) {
    if (Devices.IS_MOBILE_BROWSER) {
      return value;
    }
    return value ? Dates.format(Dates.fromISODateString(value)) : "";
  }

  public static toISODate(value: string) {
    return value ? Dates.ISODateString(value) : value;
  }

  public static toISOString(value: string) {
    return Dates.fromISODateString(value).toISOString();
  }
}
