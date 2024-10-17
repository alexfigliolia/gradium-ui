import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Input } from "Components/Input";
import { updateEmail } from "GraphQL/Mutations/updateEmail.gql";
import type {
  UpdateEmailMutation,
  UpdateEmailMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { At } from "Icons/At";
import { Modals } from "State/Modals";
import { Scope, selectTotalEmails, useScope } from "State/Scope";
import { Validators } from "Tools/Validators";
import "./styles.scss";

export const RegisteredEmail = memo(function RegisteredEmail({ email }: Props) {
  const [update, setUpdate] = useState(email);
  const totalEmails = useScope(selectTotalEmails);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUpdate(e.target.value);
  }, []);

  const deleteEmail = useCallback(() => {
    Modals.deleteEmail.open(email);
  }, [email]);

  const formAction = useCallback(
    async (data: FormData, setState: ILoadingStateSetter) => {
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
            previous: email,
            userId: Scope.getState().id,
          },
          () => {
            Scope.updateBasicInfo(response.updateEmail);
          },
        );
      } catch (error) {
        // Silence
      }
    },
    [email],
  );

  const { loading, error, success, onSubmit } = useFormState(formAction);

  const saveDisabled = useMemo(
    () => email === update && !loading,
    [email, update, loading],
  );

  const classes = useClassNames({ disabled: saveDisabled });

  return (
    <form className="registered-email" onSubmit={onSubmit}>
      <Input
        required
        type="email"
        label="Email"
        icon={<At />}
        name="email"
        autoComplete="off"
        value={update}
        onChange={onChange}
      />
      <div>
        <GradientBorderButton
          type="button"
          onClick={deleteEmail}
          disabled={totalEmails < 2}>
          Delete
        </GradientBorderButton>
        <ActionButton
          className={classes}
          loading={loading}
          error={!!error}
          success={success}
          tabIndex={saveDisabled ? -1 : undefined}>
          Save
        </ActionButton>
      </div>
    </form>
  );
});

interface Props {
  email: string;
}
