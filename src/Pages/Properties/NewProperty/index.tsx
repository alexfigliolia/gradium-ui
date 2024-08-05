import { memo } from "react";
import { ActionButton } from "Components/ActionButton";
import { ActionSheet } from "Components/ActionSheet";
import { Closer } from "Components/Closer";
import { Input } from "Components/Input";
import { useFormState } from "Hooks/useFormState";
import { Building } from "Icons/Building";
import { Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";
import "./styles.scss";

export const NewProperty = memo(
  function NewProperty(_: Propless) {
    const open = useModals(state => state.newProperty);
    const { onSubmit, loading, success, error } = useFormState(
      (_data, setState) => {
        setState("loading", true);
      },
    );
    return (
      <ActionSheet
        dim
        notch
        open={open}
        className="new-property"
        close={Modals.newProperty.close}>
        <Closer onClick={Modals.newProperty.close} />
        <h2>New Property</h2>
        <p>What would you like to name this property?</p>
        <form onSubmit={onSubmit}>
          <Input
            required
            type="text"
            minLength={3}
            icon={<Building />}
            label="Property Nickname"
          />
          <ActionButton error={!!error} success={success} loading={loading}>
            Create
          </ActionButton>
        </form>
      </ActionSheet>
    );
  },
  () => true,
);
