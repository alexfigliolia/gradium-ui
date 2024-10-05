import { memo, useRef } from "react";
import { useFormState } from "@figliolia/react-hooks";
import { ActionInput } from "Components/ActionInput";
import { inviteStaffMember } from "GraphQL/Mutations/inviteStaffMember.gql";
import type {
  InviteStaffMemberMutation,
  InviteStaffMemberMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { At } from "Icons/At";
import { Scope } from "State/Scope";
import { Validators } from "Tools/Validators";
import type { Propless } from "Types/React";

export const Invite = memo(
  function Invite(_: Propless) {
    const client = useRef<UIClient>();
    const { loading, success, error, onSubmit, setState } = useFormState(
      data => {
        client.current = new UIClient({ setState });
        void client.current.executeQuery<
          InviteStaffMemberMutation,
          InviteStaffMemberMutationVariables
        >(inviteStaffMember, {
          email: Validators.parseForm(data, "email"),
          organizationId: Scope.getState().currentOrganizationId,
        });
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
        success={success}
        loading={loading}
        buttonText="Send"
        autoComplete="off"
        onSubmit={onSubmit}
        className="invite-staff-member"
      />
    );
  },
  () => true,
);
