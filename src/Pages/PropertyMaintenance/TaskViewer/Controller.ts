import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { ManagementTask, StaffMember } from "GraphQL/Types";
import { ManagementTaskPriority, ManagementTaskStatus } from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import type { Callback, Maybe } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import { DisplayController } from "../DisplayController";

export class Controller {
  private readonly setState: SetState;
  private readonly onUpdate?: UpdateProxy;
  public static statusList = DisplayController.statuses.map(value => ({
    value,
    label: DisplayController.displayStatus(value),
  }));
  public static priorityList = DisplayController.priorities.map(value => ({
    value,
    label: DisplayController.displayPriority(value),
  }));
  constructor(setState: SetState, onUpdate?: UpdateProxy) {
    this.setState = setState;
    this.onUpdate = onUpdate;
  }

  public set<K extends keyof IState>(key: K, value: IState[K]) {
    this.setState(ps => {
      const ns = { ...ps, [key]: value };
      void this.onUpdate?.(ns);
      return ns;
    });
  }

  public setAssigned = (value: string) => {
    this.set("assigned", value);
  };

  public setPriority = (value: string) => {
    this.set(
      "priority",
      (value as ManagementTaskPriority) || ManagementTaskPriority.Low,
    );
  };

  public setStatus = (value: string) => {
    this.set("status", value as ManagementTaskStatus);
  };

  public onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "description") {
      this.set("description", value);
    } else if (name === "title") {
      this.set("title", value);
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
      priority: ManagementTaskPriority.Low,
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

  public static toHTMLOption(item: Maybe<StaffMember>) {
    if (item) {
      return { value: item.id.toString(), label: item.name } as IHTMLOption;
    }
  }
}

type SetState = Dispatch<SetStateAction<IState>>;

export type UpdateProxy = Callback<[IState], void | Promise<void>>;

export interface IState {
  title: string;
  assigned: string;
  description: string;
  status: ManagementTaskStatus;
  priority: ManagementTaskPriority;
}
