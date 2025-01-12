import { memo, useCallback, useRef } from "react";
import { useController, useLoadingState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import type { IAnonymousUploader } from "Components/UploaderGrid";
import { creating, ManagementTasks, useTasks } from "State/ManagementTasks";
import { Toasts } from "State/Toasts";
import type { Propless } from "Types/React";
import { AttachFiles } from "../AttachmentList";
import type { Controller as InputController } from "../TaskViewer";
import { TaskViewer } from "../TaskViewer";
import { Controller } from "./Controller";
import "./styles.scss";

export const CreateTask = memo(
  function CreateTask(_: Propless) {
    const open = useTasks(creating);
    const uploader = useRef<IAnonymousUploader>(null);
    const inputController = useRef<InputController>(null);
    const { loading, success, error, ...rest } = useLoadingState();
    const controller = useController(
      new Controller({
        ...rest,
        inputs: inputController,
        onSave: ([data, images]) => {
          ManagementTasks.push({ ...data, images });
          Toasts.success("Your task was created");
        },
        close: ManagementTasks.createTask.close,
      }),
    );

    const onSubmit = useCallback(() => {
      void controller
        .create(uploader?.current?.getImages?.() ?? [])
        .then(() => uploader?.current?.clear?.())
        .catch(() => {});
    }, [controller]);

    return (
      <TaskViewer
        open={open}
        className="create-task"
        ref={inputController}
        onUpdate={controller.cacheData}
        close={ManagementTasks.createTask.close}>
        <AttachFiles ref={uploader} />
        <ActionButton
          onClick={onSubmit}
          error={!!error}
          success={success}
          loading={loading}>
          Create
        </ActionButton>
      </TaskViewer>
    );
  },
  () => true,
);
