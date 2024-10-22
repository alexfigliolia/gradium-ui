import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { updateEmail } from "GraphQL/Mutations/updateEmail.gql";
import type {
  UpdateEmailMutation,
  UpdateEmailMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Modals } from "State/Modals";
import { Scope } from "State/Scope";
import { Validators } from "Tools/Validators";

export class Controller {
  private current = "";

  public register(current: string) {
    this.current = current;
  }

  public onSubmit = async (data: FormData, setState: ILoadingStateSetter) => {
    try {
      const next = Validators.emailParser(data);
      const client = new UIClient({
        setState,
        successMessage: "Your email has been updated!",
      });
      const response = await client.executeQuery<
        UpdateEmailMutation,
        UpdateEmailMutationVariables
      >(
        updateEmail,
        {
          next,
          previous: this.current,
          userId: Scope.getState().id,
        },
        () => {
          Scope.updateBasicInfo(response.updateEmail);
        },
      );
    } catch (error) {
      // Silence
    }
  };

  public deleteEmail = () => {
    Modals.deleteEmail.open(this.current);
  };
}
