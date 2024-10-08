import { memo, useRef } from "react";
import { useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { Input } from "Components/Input";
import { createProperty } from "GraphQL/Mutations/createProperty.gql";
import type {
  CreatePropertyMutation,
  CreatePropertyMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Building } from "Icons/Building";
import { Modals, useModals } from "State/Modals";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Validators } from "Tools/Validators";
import type { Propless } from "Types/React";
import "./styles.scss";

export const NewProperty = memo(
  function NewProperty(_: Propless) {
    const form = useRef<HTMLFormElement>(null);
    const open = useModals(state => state.newProperty);
    const { onSubmit, loading, success, error } = useFormState(
      async (data, setState) => {
        try {
          const name = Validators.propertyNameParser(data);
          const client = new UIClient({
            setState,
            successMessage: `The property <strong>${name}</strong> has been created!`,
          });
          const response = await client.executeQuery<
            CreatePropertyMutation,
            CreatePropertyMutationVariables
          >(createProperty, {
            name,
            organizationId: Scope.getState().currentOrganizationId,
          });
          form.current?.reset?.();
          Properties.addProperty(response.createProperty);
        } catch (error) {
          // silence
        }
      },
    );
    return (
      <Confirmation
        open={open}
        className="new-property tight"
        close={Modals.newProperty.close}>
        <h2>New Property</h2>
        <p>What would you like to name this property?</p>
        <form ref={form} onSubmit={onSubmit}>
          <Input
            required
            type="text"
            name="property-name"
            autoComplete="off"
            icon={<Building />}
            label="Property Nickname"
          />
          <ActionButton error={!!error} success={success} loading={loading}>
            Create
          </ActionButton>
        </form>
      </Confirmation>
    );
  },
  () => true,
);
