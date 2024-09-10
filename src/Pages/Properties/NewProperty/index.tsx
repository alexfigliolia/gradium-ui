import { memo, useRef } from "react";
import { useFormState, useTimeout } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { Input } from "Components/Input";
import { Building } from "Icons/Building";
import { Modals, useModals } from "State/Modals";
import { Properties } from "State/Properties";
import type { Propless } from "Types/React";
import "./styles.scss";

export const NewProperty = memo(
  function NewProperty(_: Propless) {
    const timeout = useTimeout();
    const form = useRef<HTMLFormElement>(null);
    const open = useModals(state => state.newProperty);
    const { onSubmit, loading, success, error } = useFormState(
      (data, setState, resetState) => {
        setState("loading", true);
        const name = data.get("new-property-name");
        if (!name || !name.toString().length) {
          return setState("error", true);
        }
        Properties.create(name.toString());
        setState("success", true);
        timeout.execute(() => {
          resetState();
          form.current?.reset();
          Modals.newProperty.close();
        }, 1000);
      },
    );
    return (
      <Confirmation
        open={open}
        className="new-property"
        close={Modals.newProperty.close}>
        <h2>New Property</h2>
        <p>What would you like to name this property?</p>
        <form ref={form} onSubmit={onSubmit}>
          <Input
            required
            type="text"
            minLength={3}
            name="new-property-name"
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
