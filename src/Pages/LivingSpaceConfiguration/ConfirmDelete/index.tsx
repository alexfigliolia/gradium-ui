import { memo, useCallback } from "react";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import {
  LivingSpaces,
  selectDeletion,
  useLivingSpaces,
} from "State/LivingSpaces";
import { Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";

export const ConfirmDelete = memo(
  function ConfirmDelete(_: Propless) {
    const open = useModals(state => state.deleteSpace);
    const [name, index] = useLivingSpaces(selectDeletion);
    const confirm = useCallback(() => {
      LivingSpaces.delete(index);
      Modals.deleteSpace.close();
    }, [index]);
    return (
      <Confirmation open={open} close={Modals.deleteSpace.close}>
        <h2>Confirmation</h2>
        <p>
          Are you sure you wish to delete the living space{" "}
          <strong>{name}</strong>
        </p>
        <ActionButton onClick={confirm}>Confirm</ActionButton>
      </Confirmation>
    );
  },
  () => true,
);
