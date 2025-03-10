import { memo, useCallback, useRef } from "react";
import {
  useLoadingState,
  useTimeout,
  useUnmount,
} from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { deleteEmail as deleteEmailQuery } from "GraphQL/Mutations/deleteEmail.gql";
import type {
  DeleteEmailMutation,
  DeleteEmailMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Account, selectEmailDeletion, useAccount } from "State/Account";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import "./styles.scss";

export const DeleteEmail = memo(function DeleteEmail(_: Propless) {
  const emailRef = useRef("");
  const timeout = useTimeout();
  const [open, email] = useAccount(selectEmailDeletion);
  const { loading, error, success, setState } = useLoadingState();

  const deleteEmail = useCallback(() => {
    const client = new UIClient({
      setState,
      successMessage: `The email address <strong>${email}</strong> has been removed from your account`,
    });
    void client
      .executeQuery<DeleteEmailMutation, DeleteEmailMutationVariables>(
        deleteEmailQuery,
        {
          email,
          userId: Scope.getState().id,
        },
      )
      .then(response => {
        Scope.updateBasicInfo(response.deleteEmail);
        timeout.execute(() => {
          Account.deleteEmail.close();
        }, 1000);
      })
      .catch(() => {});
  }, [email, setState, timeout]);

  if (open && email) {
    emailRef.current = email;
  }

  useUnmount(() => {
    emailRef.current = email;
  });

  return (
    <Confirmation
      open={open}
      className="delete-email tight"
      close={Account.deleteEmail.close}>
      <h2>Confirmation</h2>
      <p>
        Are you sure you want to remove the email{" "}
        <strong>{emailRef.current}</strong>?
      </p>
      <ActionButton
        onClick={deleteEmail}
        loading={loading}
        error={!!error}
        success={success}>
        Confirm
      </ActionButton>
    </Confirmation>
  );
});
