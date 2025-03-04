import { ManagementTaskPriority, ManagementTaskStatus } from "GraphQL/Types";
import { HighPriority } from "Icons/HighPriority";
import { ImmediatePriority } from "Icons/ImmediatePriority";
import { LowPriority } from "Icons/LowPriority";

export class DisplayController {
  public static readonly priorities = [
    ManagementTaskPriority.Low,
    ManagementTaskPriority.High,
    ManagementTaskPriority.Immediate,
  ];
  public static readonly statuses = [
    ManagementTaskStatus.Todo,
    ManagementTaskStatus.InProgress,
    ManagementTaskStatus.UnderReview,
    ManagementTaskStatus.Complete,
  ];

  public static readonly priorityOptions = this.priorities.map(priority => ({
    value: priority,
    label: this.displayPriority(priority),
  }));

  public static readonly fullPriorityOptions = this.priorities.map(
    priority => ({
      value: priority,
      label: this.displayPriorityFull(priority),
    }),
  );

  public static readonly statusOptions = this.statuses.map(status => ({
    value: status,
    label: this.displayStatus(status),
  }));

  public static displayStatus(key: ManagementTaskStatus) {
    switch (key) {
      case ManagementTaskStatus.Todo:
        return "Todo";
      case ManagementTaskStatus.InProgress:
        return "In Progress";
      case ManagementTaskStatus.UnderReview:
        return "Under Review";
      case ManagementTaskStatus.Complete:
        return "Complete";
    }
  }

  public static displayPriority(key: ManagementTaskPriority) {
    switch (key) {
      case ManagementTaskPriority.Low:
        return "Low";
      case ManagementTaskPriority.High:
        return "High";
      case ManagementTaskPriority.Immediate:
        return "Immediate";
    }
  }

  public static displayPriorityFull(key: ManagementTaskPriority) {
    switch (key) {
      case ManagementTaskPriority.Low:
        return "Low Priority";
      case ManagementTaskPriority.High:
        return "High Priority";
      case ManagementTaskPriority.Immediate:
        return "Immediate Priority";
    }
  }

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
