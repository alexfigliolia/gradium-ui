import { memo, useCallback, useEffect, useRef } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useFormState, useTimeout } from "@figliolia/react-hooks";
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
import { linkEmail, Modals, useModals } from "State/Modals";
import { Scope } from "State/Scope";
import { Validators } from "Tools/Validators";
import type { Propless } from "Types/React";
import "./styles.scss";

export const LinkEmail = memo(function LinkEmail(_: Propless) {
  const open = useModals(linkEmail);
  const timeout = useTimeout();
  const input = useRef<InputRef<"email">>(null);

  const clear = useCallback(() => {
    if (input.current?.input) {
      input.current.input.value = "";
    }
  }, []);

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
        Scope.updateBasicInfo(response.linkEmail);
        timeout.execute(clear, 500);
      } catch (error) {
        // Silence
      }
    },
    [clear, timeout],
  );

  useEffect(() => {
    clear();
  }, [open, clear]);

  const { loading, error, success, onSubmit } = useFormState(formAction);
  return (
    <Confirmation
      open={open}
      className="link-email tight"
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
