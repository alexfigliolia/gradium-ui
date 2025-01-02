import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { ManagementTask, ManagementTaskPriority } from "GraphQL/Types";
import { ManagementTaskStatus } from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { DisplayController } from "../DisplayController";

export class Controller {
  private setState: SetState;
  public static statusList = DisplayController.statuses.map(value => ({
    value,
    label: DisplayController.displayStatus(value),
  }));
  public static priorityList = DisplayController.priorities.map(value => ({
    value,
    label: DisplayController.displayPriority(value),
  }));
  constructor(setState: SetState) {
    this.setState = setState;
  }

  public set<K extends keyof IState>(key: K, value: IState[K]) {
    this.setState(ps => ({ ...ps, [key]: value }));
  }

  public setAssigned = (value: string) => {
    this.set("assigned", value);
  };

  public setPriority = (value: string) => {
    this.set("priority", value as ManagementTaskPriority);
  };

  public setStatus = (value: string) => {
    this.set("status", value as ManagementTaskStatus);
  };

  public onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "description") {
      this.setState(ps => ({ ...ps, description: value }));
    } else if (name === "title") {
      this.setState(ps => ({ ...ps, title: value }));
    }
  };

  public toGQL({ title, description, assigned, status, priority }: IState) {
    return {
      title,
      description,
      assignedToId: assigned === "" ? undefined : parseInt(assigned),
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
      status,
      priority,
    };
  }

  public resetState(task: ManagementTask) {
    this.setState(Controller.initialState(task));
  }

  public clearForm() {
    this.setState({
      title: "",
      description: "",
      assigned: "",
      priority: "" as ManagementTaskPriority,
      status: ManagementTaskStatus.Todo,
    });
  }

  public static initialState(task: ManagementTask) {
    return {
      title: task.title,
      description: task.description,
      assigned: task.assignedTo?.id?.toString?.() ?? "",
      status: task.status ?? ManagementTaskStatus.Todo,
      priority: task.priority,
    };
  }
}

type SetState = Dispatch<SetStateAction<IState>>;

export interface IState {
  title: string;
  assigned: string;
  description: string;
  status: ManagementTaskStatus;
  priority: ManagementTaskPriority;
}
