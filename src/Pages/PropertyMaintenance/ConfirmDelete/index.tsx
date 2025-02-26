import { memo, useCallback } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useLoadingState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { GradientButton } from "Components/GradientButton";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const ConfirmDelete = memo(function ConfirmDelete({
  open,
  title,
  description,
  close,
  onConfirm,
}: Props) {
  const { loading, success, error, setState } = useLoadingState();

  const deleteItem = useCallback(() => {
    onConfirm(setState);
  }, [setState, onConfirm]);

  return (
    <Confirmation
      open={open}
      className="delete-maintentance-item"
      close={close}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="actions">
        <GradientButton className="delete" onClick={close}>
          Cancel
        </GradientButton>
        <ActionButton
          onClick={deleteItem}
          error={!!error}
          success={success}
          loading={loading}>
          Confirm
        </ActionButton>
      </div>
    </Confirmation>
  );
});

interface Props {
  open: boolean;
  close: Callback;
  title: string;
  description: string;
  onConfirm: Callback<[ILoadingStateSetter]>;
}
