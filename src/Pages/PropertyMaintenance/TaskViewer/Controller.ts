import type { ChangeEvent } from "react";
import type {
  CreateManagementTaskMutationVariables,
  ManagementTask,
} from "GraphQL/Types";
import { ManagementTaskPriority, ManagementTaskStatus } from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { MaintenanceItemViewerController } from "../BaseControllers";

export class Controller extends MaintenanceItemViewerController<
  IState,
  ManagementTask,
  CreateManagementTaskMutationVariables
> {
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
    this.set(
      "status",
      (value as ManagementTaskStatus) || ManagementTaskStatus.Todo,
    );
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
}

export interface IState {
  title: string;
  assigned: string;
  description: string;
  status: ManagementTaskStatus;
  priority: ManagementTaskPriority;
}
