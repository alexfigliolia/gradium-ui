import { memo, useCallback } from "react";
import { useLoadingState, useTimeout } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const ConfirmDelete = memo(function ConfirmDelete({
  type,
  image,
  close,
  entityId,
  onDelete,
}: Props) {
  const timeout = useTimeout();
  const { loading, success, error, setState, resetState } = useLoadingState();

  const deleteAttachment = useCallback(() => {
    if (!image) {
      return;
    }
    setState("loading", true);
    void CloudinaryDeleter.deleteImage(image, {
      type,
      entityId,
    }).then(img => {
      if (img) {
        setState("success", true);
        onDelete(img);
      } else {
        setState("error", true);
      }
      timeout.execute(() => {
        resetState();
        close();
      }, 2000);
    });
  }, [image, setState, resetState, close, timeout, onDelete, entityId, type]);

  return (
    <Confirmation
      className="confirm-delete-task-attachment"
      open={!!image}
      close={close}>
      <h2>Are you sure?</h2>
      <p>Deleting attachments is permanent</p>
      <ActionButton
        onClick={deleteAttachment}
        loading={loading}
        success={success}
        error={!!error}>
        Confirm
      </ActionButton>
    </Confirmation>
  );
});

interface Props {
  close: Callback;
  image?: GradiumImage;
  type: GradiumImageType;
  entityId: number;
  onDelete: Callback<[GradiumImage]>;
}
