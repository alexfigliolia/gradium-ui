import { memo } from "react";
import { useFormState, useTimeout } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { Input } from "Components/Input";
import { forgotPassword as forgotPasswordQuery } from "GraphQL/Mutations/forgotPassword.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from "GraphQL/Types";
import { At } from "Icons/At";
import { forgotPassword, Modals, useModals } from "State/Modals";
import { Toasts, toastsEmpty, useToasts } from "State/Toasts";
import type { Propless } from "Types/React";
import "./styles.scss";

export const ForgotPassword = memo(
  function ForgotPassword(_: Propless) {
    const timeout = useTimeout();
    const open = useModals(forgotPassword);
    const { loading, success, error, onSubmit } = useFormState(
      (data, setState) => {
        setState("loading", true);
        void graphQLRequest<
          ForgotPasswordMutation,
          ForgotPasswordMutationVariables
        >(forgotPasswordQuery, {
          email: data.get("email")?.toString() ?? "",
        })
          .then(() => {
            setState("success", true);
            Toasts.toast({
              type: "success",
              message:
                "We've sent you an email with instructions to reset your password",
            });
          })
          .catch(error => {
            setState("error", error[0].message ?? "");
            Toasts.toast({
              type: "error",
              message: error[0].message ?? "",
            });
          })
          .finally(() => {
            timeout.execute(() => {
              setState("loading", false);
            }, 2000);
          });
      },
    );

    const clickOutside = useToasts(toastsEmpty);

    return (
      <Confirmation
        open={open}
        clickOutside={clickOutside}
        className="forgot-password-sheet"
        close={Modals.forgotPassword.close}>
        <h2>Reset Password</h2>
        <p>
          You&apos;ll receive an email at the specified address with a link
          toreset your password
        </p>
        <form onSubmit={onSubmit}>
          <Input
            required
            type="email"
            name="email"
            label="Email"
            icon={<At />}
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
