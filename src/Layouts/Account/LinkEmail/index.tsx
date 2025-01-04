import { memo, useCallback, useEffect, useRef } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import type { InputRef } from "Components/Input";
import { Input } from "Components/Input";
import { linkEmail as linkEmailQuery } from "GraphQL/Mutations/linkEmail.gql";
import type {
  LinkEmailMutation,
  LinkEmailMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { At } from "Icons/At";
import { Account, linkEmail, useAccount } from "State/Account";
import { Scope } from "State/Scope";
import { Validators } from "Tools/Validators";
import type { Propless } from "Types/React";
import "./styles.scss";

export const LinkEmail = memo(function LinkEmail(_: Propless) {
  const open = useAccount(linkEmail);
  const input = useRef<InputRef<"email">>(null);

  const formAction = useCallback(
    async (data: FormData, setState: ILoadingStateSetter) => {
      try {
        const email = Validators.emailParser(data);
        const client = new UIClient({
          setState,
          successMessage: `The email address <strong>${email}</strong> has been successfully linked to your account`,
        });
        const response = await client.executeQuery<
          LinkEmailMutation,
          LinkEmailMutationVariables
        >(linkEmailQuery, {
          email,
          userId: Scope.getState().id,
        });
        input.current?.clear?.();
        Scope.updateBasicInfo(response.linkEmail);
      } catch (error) {
        // Silence
      }
    },
    [],
  );

  useEffect(() => {
    input.current?.clear?.();
  }, [open]);

  const { loading, error, success, onSubmit } = useFormState(formAction);
  return (
    <Confirmation
      open={open}
      className="link-email tight"
      close={Account.linkEmail.close}>
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
          ref={input}
          inputMode="email"
          autoComplete="off"
        />
        <ActionButton loading={loading} error={!!error} success={success}>
          Save
        </ActionButton>
      </form>
    </Confirmation>
  );
});
