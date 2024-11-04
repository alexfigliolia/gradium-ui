import { ManagementTaskPriority } from "GraphQL/Types";
import { HighPriority } from "Icons/HighPriority";
import { ImmediatePriority } from "Icons/ImmediatePriority";
import { LowPriority } from "Icons/LowPriority";
import { Dates } from "Tools/Dates";

export class Controller {
  public static renderIcon(priority: ManagementTaskPriority) {
    switch (priority) {
      case ManagementTaskPriority.High:
        return HighPriority;
      case ManagementTaskPriority.Low:
        return LowPriority;
      case ManagementTaskPriority.Immediate:
        return ImmediatePriority;
      default:
        return undefined as never;
    }
  }

  public static mapPriority(priority: ManagementTaskPriority) {
    switch (priority) {
      case ManagementTaskPriority.High:
        return "High";
      case ManagementTaskPriority.Low:
        return "Low";
      case ManagementTaskPriority.Immediate:
        return "Immediate";
      default:
        return undefined as never;
    }
  }

  public static renderDateTime(date: Date) {
    return `${Dates.toLocale(date, {
      month: "long",
      day: "numeric",
      year: "numeric",
    })} at ${Dates.toLocale(date, {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }
}
