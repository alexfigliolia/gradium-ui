import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { Debouncer } from "@figliolia/react-hooks";
import { setOrganizationName } from "GraphQL/Mutations/setOrganizationName.gql";
import type {
  SetOrganizationNameMutation,
  SetOrganizationNameMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Scope } from "State/Scope";

export class Controller {
  setState: ILoadingStateSetter;
  constructor(setState: ILoadingStateSetter) {
    this.setState = setState;
  }
  private Debouncer = new Debouncer(this.update.bind(this), 2000);

  public executeQuery(name: string) {
    return this.Debouncer.execute(name);
  }

  private update(name: string) {
    const client = new UIClient({
      setState: this.setState,
      successMessage: "Your organization's name has been updated",
    });
    const { currentOrganizationId } = Scope.getState();
    return client
      .executeQuery<
        SetOrganizationNameMutation,
        SetOrganizationNameMutationVariables
      >(setOrganizationName, {
        name,
        organizationId: currentOrganizationId,
      })
      .then(() => {
        Scope.updateOrgName(name, currentOrganizationId);
      })
      .catch(() => {});
  }
}
