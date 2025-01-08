import { memo, useCallback, useEffect, useRef } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useFormState, useTimeout, useUnmount } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import type { InputRef } from "Components/Input";
import { Input } from "Components/Input";
import { forgotPassword as forgotPasswordQuery } from "GraphQL/Mutations/forgotPassword.gql";
import type {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { At } from "Icons/At";
import { Account, forgotPassword, useAccount } from "State/Account";
import { toastsEmpty, useToasts } from "State/Toasts";
import type { Propless } from "Types/React";
import "./styles.scss";

export const ForgotPassword = memo(
  function ForgotPassword(_: Propless) {
    const timeout = useTimeout();
    const client = useRef<UIClient>();
    const open = useAccount(forgotPassword);
    const controller = useRef<InputRef<"password">>(null);
    const clickOutside = useToasts(toastsEmpty);

    const resetPassword = useCallback(
      (data: FormData, setState: ILoadingStateSetter) => {
        client.current = new UIClient({
          setState,
          successMessage: ["forgotPassword"],
        });
        void client.current.executeQuery<
          ForgotPasswordMutation,
          ForgotPasswordMutationVariables
        >(
          forgotPasswordQuery,
          {
            email: data.get("email")?.toString?.() ?? "",
          },
          Account.forgotPassword.close,
        );
      },
      [],
    );

    const { loading, success, error, onSubmit } = useFormState(resetPassword);

    useEffect(() => {
      if (!open) {
        timeout.execute(() => {
          if (controller.current?.input) {
            controller.current.input.value = "";
          }
        }, 300);
      }
    }, [open, timeout]);

    useUnmount(() => {
      if (client.current) {
        client.current.abort();
      }
    });

    return (
      <Confirmation
        open={open}
        clickOutside={clickOutside}
        className="forgot-password-sheet tight"
        close={Account.forgotPassword.close}>
        <h2>Reset Password</h2>
        <p>
          You&apos;ll receive an email at the specified address with a link to
          reset your password
        </p>
        <form onSubmit={onSubmit}>
          <Input
            required
            type="email"
            name="email"
            label="Email"
            icon={<At />}
            inputMode="email"
            ref={controller}
          />
          <ActionButton
            type="submit"
            error={!!error}
            success={success}
            loading={loading}>
            Reset
          </ActionButton>
        </form>
      </Confirmation>
    );
  },
  () => true,
);
