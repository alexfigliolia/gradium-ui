import { memo, useCallback, useRef } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import type { InputRef } from "Components/Input";
import { Input } from "Components/Input";
import { resetPassword } from "GraphQL/Mutations/resetPassword.gql";
import type {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { LockStroked } from "Icons/Lock";
import { Modals, selectResetPassword, useModals } from "State/Modals";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import { Validators } from "Tools/Validators";
import type { Propless } from "Types/React";
import "./styles.scss";

export const ResetPassword = memo(function ResetPassword(_: Propless) {
  const nextPW = useRef<InputRef>(null);
  const currentPW = useRef<InputRef>(null);
  const form = useRef<HTMLFormElement>(null);
  const open = useModals(selectResetPassword);
  const callback = useCallback(
    async (data: FormData, setState: ILoadingStateSetter) => {
      const client = new UIClient({
        setState,
        successMessage: "Your password has been reset!",
      });
      try {
        const next = Validators.createParser(
          "new-password",
          Validators.validatePassword,
        )(data);
        const previous = Validators.parseForm(data, "current-password");
        if (next === previous) {
          Toasts.error(
            "Your new password can not be the same as your current password",
          );
          return;
        }
        await client.executeQuery<
          ResetPasswordMutation,
          ResetPasswordMutationVariables
        >(
          resetPassword,
          {
            next,
            previous,
            userId: Scope.getState().id,
          },
          () => {
            nextPW.current?.clear?.();
            currentPW.current?.clear?.();
            Modals.resetPassword.close();
          },
        );
      } catch (error) {
        // silence
      }
    },
    [],
  );
  const { loading, error, success, onSubmit } = useFormState(callback);
  return (
    <Confirmation
      open={open}
      className="reset-password tight"
      close={Modals.resetPassword.close}>
      <h2>Reset Password</h2>
      <p>Ah, wise decision!</p>
      <form ref={form} onSubmit={onSubmit}>
        <Input
          required
          ref={currentPW}
          icon={<LockStroked />}
          type="password"
          label="Current Password"
          name="current-password"
          autoComplete="current-password"
        />
        <Input
          required
          ref={nextPW}
          icon={<LockStroked />}
          type="password"
          label="New Password"
          name="new-password"
          autoComplete="off"
        />
        <ActionButton loading={loading} error={!!error} success={success}>
          Reset
        </ActionButton>
      </form>
    </Confirmation>
  );
});
