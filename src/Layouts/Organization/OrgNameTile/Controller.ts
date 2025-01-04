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
  public readonly setState: ILoadingStateSetter;
  private readonly Debouncer = new Debouncer(this.update.bind(this), 2000);
  constructor(setState: ILoadingStateSetter) {
    this.setState = setState;
  }

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
