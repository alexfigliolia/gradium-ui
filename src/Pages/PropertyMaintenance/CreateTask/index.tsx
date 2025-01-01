import { memo, useCallback, useRef, useState } from "react";
import { type ILoadingStateSetter, useTimeout } from "@figliolia/react-hooks";
import type { ImageState } from "Components/UploaderGrid/Image";
import { creating, ManagementTasks, useTasks } from "State/ManagementTasks";
import type { Callback } from "Types/Generics";
import type { Propless } from "Types/React";
import type { SubmitTaskArgs } from "../TaskModal";
import { TaskModal } from "../TaskModal";
import { Attachments } from "./Attachments";
import { Controller } from "./Controller";

export const CreateTask = memo(function CreateTask(_: Propless) {
  const timeout = useTimeout();
  const open = useTasks(creating);
  const clearForm = useRef<Callback>(null);
  const [images, setImages] = useState<ImageState[]>([]);

  const createTask = useCallback(
    async (
      data: SubmitTaskArgs,
      setState: ILoadingStateSetter,
      resetState: Callback,
    ) => {
      setState("loading", true);
      const result = await Controller.create(data, images);
      if (!result) {
        setState("error", true);
      } else {
        setState("success", true);
        ManagementTasks.push(result);
      }
      timeout.execute(() => {
        ManagementTasks.createTask.close();
        clearForm.current?.();
        resetState();
        setImages([]);
      }, 2000);
    },
    [images, timeout],
  );

  return (
    <TaskModal
      open={open}
      ref={clearForm}
      title="Create Task"
      actionText="Create"
      onFormSubmit={createTask}
      close={ManagementTasks.createTask.close}>
      <Attachments images={images} setImages={setImages} />
    </TaskModal>
  );
});
