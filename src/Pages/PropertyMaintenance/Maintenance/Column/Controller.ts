import { ManagementTaskStatus } from "GraphQL/Types";

export class Controller {
  public static readonly MAP = {
    [ManagementTaskStatus.Todo]: "To Do",
    [ManagementTaskStatus.InProgress]: "In Progress",
    [ManagementTaskStatus.UnderReview]: "Under Review",
    [ManagementTaskStatus.Complete]: "Complete",
  };
}
