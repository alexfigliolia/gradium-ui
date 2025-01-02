import { memo, useCallback, useRef, useState } from "react";
import {
  type ILoadingStateSetter,
  useFormState,
  useTimeout,
} from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import type { ImageState } from "Components/UploaderGrid/Image";
import { creating, ManagementTasks, useTasks } from "State/ManagementTasks";
import type { Callback } from "Types/Generics";
import type { Propless } from "Types/React";
import type { InputController } from "../TaskInputs";
import { TaskInputs } from "../TaskInputs";
import { Attachments } from "./Attachments";
import { Controller } from "./Controller";
import "./styles.scss";

export const CreateTask = memo(function CreateTask(_: Propless) {
  const timeout = useTimeout();
  const open = useTasks(creating);
  const form = useRef<HTMLFormElement>(null);
  const inputController = useRef<InputController>(null);
  const [images, setImages] = useState<ImageState[]>([]);

  const createTask = useCallback(
    async (
      _: FormData,
      setState: ILoadingStateSetter,
      resetState: Callback,
    ) => {
      if (!inputController.current) {
        return;
      }
      const { getState, controller } = inputController.current;
      setState("loading", true);
      const result = await Controller.create(
        controller.toGQL(getState()),
        images,
      );
      if (!result) {
        setState("error", true);
      } else {
        setState("success", true);
        ManagementTasks.push(result);
      }
      timeout.execute(() => {
        ManagementTasks.createTask.close();
        form.current?.reset?.();
        resetState();
        controller.clearForm();
        setImages([]);
      }, 2000);
    },
    [images, timeout],
  );

  const { loading, success, error, onSubmit } = useFormState(createTask);

  return (
    <Confirmation
      open={open}
      className="create-maintentance-task"
      close={ManagementTasks.createTask.close}>
      <h2>Create Task</h2>
      <p>
        Tasks you create can be tracked on your board. Assigned staff members
        will be notified when receiving new tasks.
      </p>
      <form ref={form} onSubmit={onSubmit}>
        <TaskInputs ref={inputController}>
          <Attachments images={images} setImages={setImages} />
        </TaskInputs>
        <ActionButton
          type="submit"
          error={!!error}
          success={success}
          loading={loading}>
          Create
        </ActionButton>
      </form>
    </Confirmation>
  );
});
