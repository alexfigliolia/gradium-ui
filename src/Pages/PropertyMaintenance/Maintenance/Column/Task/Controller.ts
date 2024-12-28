import { ManagementTaskPriority } from "GraphQL/Types";
import { HighPriority } from "Icons/HighPriority";
import { ImmediatePriority } from "Icons/ImmediatePriority";
import { LowPriority } from "Icons/LowPriority";

export class Controller {
  public static priorityIcon(status: ManagementTaskPriority) {
    switch (status) {
      case ManagementTaskPriority.High:
        return HighPriority;
      case ManagementTaskPriority.Immediate:
        return ImmediatePriority;
      case ManagementTaskPriority.Low:
        return LowPriority;
    }
  }
}
