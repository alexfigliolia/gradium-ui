import { memo, useCallback } from "react";
import { useLoadingState, useTimeout } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { type GradiumImage, GradiumImageType } from "GraphQL/Types";
import {
  ManagementTasks,
  selectScopedTask,
  useTasks,
} from "State/ManagementTasks";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const ConfirmDelete = memo(function ConfirmDelete({
  image,
  close,
}: Props) {
  const timeout = useTimeout();
  const task = useTasks(selectScopedTask);
  const { loading, success, error, setState, resetState } = useLoadingState();

  const deleteAttachment = useCallback(() => {
    if (!image) {
      return;
    }
    setState("loading", true);
    void CloudinaryDeleter.delete(image, {
      entityId: task.id,
      type: GradiumImageType.TaskImage,
    }).then(img => {
      if (img) {
        setState("success", true);
        ManagementTasks.partialUpdateByID(task.id, {
          images: task.images.filter(image => image.id !== img.id),
        });
      } else {
        setState("error", true);
      }
      timeout.execute(() => {
        resetState();
        close();
      }, 2000);
    });
  }, [task, image, setState, resetState, close, timeout]);

  return (
    <Confirmation
      className="confirm-delete-task-attachment"
      open={!!image}
      close={close}>
      <h2>Are you sure?</h2>
      <p>Deleting task attachments is permanent</p>
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
}
