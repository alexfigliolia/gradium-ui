import { memo, useCallback, useRef, useState } from "react";
import { useController, useLoadingState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import type { ImageState } from "Components/UploaderGrid/Image";
import { creating, ManagementTasks, useTasks } from "State/ManagementTasks";
import type { Propless } from "Types/React";
import type { Controller as InputController } from "../TaskViewer";
import { TaskViewer } from "../TaskViewer";
import { Attachments } from "./Attachments";
import { Controller } from "./Controller";
import "./styles.scss";

export const CreateTask = memo(
  function CreateTask(_: Propless) {
    const open = useTasks(creating);
    const inputController = useRef<InputController>(null);
    const [images, setImages] = useState<ImageState[]>([]);
    const { loading, success, error, ...rest } = useLoadingState();
    const controller = useController(
      new Controller({ ...rest, inputs: inputController }),
    );

    const onSubmit = useCallback(() => {
      void controller.createTask(images).then(() => setImages([]));
    }, [controller, images]);

    return (
      <TaskViewer
        open={open}
        className="create-task"
        ref={inputController}
        onUpdate={controller.cacheTask}
        close={ManagementTasks.createTask.close}>
        <Attachments images={images} setImages={setImages} />
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
