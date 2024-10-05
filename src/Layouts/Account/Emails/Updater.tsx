import { memo } from "react";
import { useFormState } from "@figliolia/react-hooks";
import { ActionInput } from "Components/ActionInput";
import { updateEmail } from "GraphQL/Mutations/updateEmail.gql";
import type {
  UpdateEmailMutation,
  UpdateEmailMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { At } from "Icons/At";
import { Scope } from "State/Scope";
import { Validators } from "Tools/Validators";

export const Updater = memo(function Updater({ email }: Props) {
  const { loading, error, success, onSubmit } = useFormState(
    async (data, setState) => {
      try {
        const next = Validators.emailParser(data);
        const client = new UIClient({ setState });
        const response = await client.executeQuery<
          UpdateEmailMutation,
          UpdateEmailMutationVariables
        >(updateEmail, {
          next,
          previous: email,
          userId: Scope.getState().id,
        });
        Scope.updateBasicInfo(response.updateEmail);
      } catch (error) {
        // Silence
      }
    },
  );
  return (
    <ActionInput
      required
      name="email"
      type="email"
      label="Email"
      icon={<At />}
      error={!!error}
      loading={loading}
      success={success}
      autoComplete="off"
      onSubmit={onSubmit}
      buttonText="Update"
      defaultValue={email}
    />
  );
});

interface Props {
  email: string;
}
