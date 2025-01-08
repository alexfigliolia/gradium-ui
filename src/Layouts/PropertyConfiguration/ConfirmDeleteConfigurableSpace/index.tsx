import { memo, useCallback } from "react";
import { useLoadingState, useUnmount } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import type { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import type { IConfigurableSpace } from "Types/Gradium";

export const ConfirmDeleteConfigurableSpace = memo(
  function ConfirmDeleteConfigurableSpace<T extends IConfigurableSpace>({
    id,
    name,
    type,
    open,
    model,
  }: Props<T>) {
    const { loading, error, success, setState } = useLoadingState();

    const confirm = useCallback(() => {
      void model.deleteItem(id, setState, () => {
        model.deleteConfirmation.close();
      });
    }, [model, id, setState]);

    useUnmount(() => {
      model.resetDeletionScope();
    });

    return (
      <Confirmation open={open} close={model.deleteConfirmation.close}>
        <h2>Confirmation</h2>
        {name.length > 2 ? (
          <p>
            Are you sure you wish to delete the {type} <strong>{name}</strong>?
          </p>
        ) : (
          <p>Are you sure you wish to delete this {type}?</p>
        )}
        <ActionButton
          error={!!error}
          loading={loading}
          success={success}
          onClick={confirm}>
          Confirm
        </ActionButton>
      </Confirmation>
    );
  },
);

interface Props<T extends IConfigurableSpace> {
  id: number;
  open: boolean;
  name: string;
  type: string;
  model: ConfigurableSpaceModel<T>;
}
