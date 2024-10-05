import { memo } from "react";
import { useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { Input } from "Components/Input";
import { linkEmail as linkEmailQuery } from "GraphQL/Mutations/linkEmail.gql";
import type {
  LinkEmailMutation,
  LinkEmailMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { At } from "Icons/At";
import { linkEmail, Modals, useModals } from "State/Modals";
import { Scope } from "State/Scope";
import { Validators } from "Tools/Validators";
import type { Propless } from "Types/React";
import "./styles.scss";

export const LinkEmail = memo(function LinkEmail(_: Propless) {
  const open = useModals(linkEmail);
  const { loading, error, success, onSubmit } = useFormState(
    async (data, setState) => {
      try {
        const email = Validators.emailParser(data);
        const client = new UIClient({ setState });
        const response = await client.executeQuery<
          LinkEmailMutation,
          LinkEmailMutationVariables
        >(linkEmailQuery, {
          email,
          userId: Scope.getState().id,
        });
        Scope.updateBasicInfo(response.linkEmail);
      } catch (error) {
        // Silence
      }
    },
  );
  return (
    <Confirmation
      open={open}
      className="link-email"
      close={Modals.linkEmail.close}>
      <h2>Link Email Address</h2>
      <p>
        To link a new email address to your account, enter it below, then press
        save
      </p>
      <form onSubmit={onSubmit}>
        <Input
          required
          type="Email"
          label="New Email"
          icon={<At />}
          name="email"
          autoComplete="off"
        />
        <ActionButton loading={loading} error={!!error} success={success}>
          Save
        </ActionButton>
      </form>
    </Confirmation>
  );
});
