import { memo, useCallback, useRef } from "react";
import { useController, useLoadingState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import type { IAnonymousUploader } from "Components/UploaderGrid";
import {
  creatingExpense,
  ManagementTasks,
  useTasks,
} from "State/ManagementTasks";
import { Toasts } from "State/Toasts";
import type { Propless } from "Types/React";
import { AttachFiles } from "../AttachmentList";
import type { Controller as InputController } from "../ExpenseViewer";
import { ExpenseViewer } from "../ExpenseViewer";
import { Controller } from "./Controller";
import "./styles.scss";

export const CreateExpense = memo(
  function CreateExpense(_: Propless) {
    const open = useTasks(creatingExpense);
    const uploader = useRef<IAnonymousUploader>(null);
    const inputController = useRef<InputController>(null);
    const { loading, success, error, ...rest } = useLoadingState();
    const controller = useController(
      new Controller({
        ...rest,
        inputs: inputController,
        onSave: ([data, attachments]) => {
          ManagementTasks.pushExpense({
            ...data,
            attachments,
          });
          Toasts.success("Your expense was created");
        },
        close: ManagementTasks.createExpense.close,
      }),
    );

    const onSubmit = useCallback(() => {
      void controller
        .create(uploader.current?.getImages?.() ?? [])
        .then(() => uploader.current?.clear?.())
        .catch(() => {});
    }, [controller]);

    return (
      <ExpenseViewer
        open={open}
        ref={inputController}
        className="create-expense"
        onUpdate={controller.cacheData}
        close={ManagementTasks.createExpense.close}>
        <AttachFiles ref={uploader} className="expense-attachments" />
        <ActionButton
          onClick={onSubmit}
          error={!!error}
          success={success}
          loading={loading}>
          Create
        </ActionButton>
      </ExpenseViewer>
    );
  },
  () => true,
);
