import { ManagementTaskPriority, ManagementTaskStatus } from "GraphQL/Types";

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
}
