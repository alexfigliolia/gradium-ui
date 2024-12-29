import { DisplayController } from "../DisplayController";

export class Controller {
  public static statusList = DisplayController.statuses.map(value => ({
    value,
    label: DisplayController.displayStatus(value),
  }));

  public static priorityList = DisplayController.priorities.map(value => ({
    value,
    label: DisplayController.displayPriority(value),
  }));
}
