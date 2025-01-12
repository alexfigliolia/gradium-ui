import type { ChangeEvent } from "react";
import type { CreateExpenseMutationVariables, Expense } from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { MaintenanceItemViewerController } from "../BaseControllers";

export class Controller extends MaintenanceItemViewerController<
  IState,
  Expense,
  Omit<CreateExpenseMutationVariables, "taskId">
> {
  public onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "description") {
      this.set("description", value);
    } else if (name === "title") {
      this.set("title", value);
    } else if (name === "cost") {
      this.set("cost", value);
    }
  };

  public toGQL({ cost, title, description }: IState) {
    return {
      title,
      description,
      cost: cost || "0.00",
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    };
  }

  public resetState(expense: Expense) {
    this.setState(Controller.initialState(expense));
  }

  public clearForm() {
    this.setState({
      title: "",
      cost: "",
      description: "",
    });
  }

  public static initialState(expense: Expense) {
    return {
      cost: expense.cost,
      title: expense.title,
      description: expense.description,
    };
  }
}

export interface IState {
  title: string;
  cost: string;
  description: string;
}
