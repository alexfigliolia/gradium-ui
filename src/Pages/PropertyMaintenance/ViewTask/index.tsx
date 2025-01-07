import { memo, useCallback, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController, useDebouncer } from "@figliolia/react-hooks";
import type { Controller } from "Components/TouchSlider";
import { updateManagementTask } from "GraphQL/Mutations/updateManagementTask.gql";
import {
  type GradiumImage,
  GradiumImageType,
  type UpdateManagementTaskMutation,
  type UpdateManagementTaskMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import {
  ManagementTasks,
  selectScopedTask,
  useTasks,
  viewing,
} from "State/ManagementTasks";
import { ModalStack } from "Tools/ModalStack";
import type { Propless } from "Types/React";
import { ImageViewer } from "../ImageViewer";
import type { Controller as InputController, IState } from "../TaskViewer";
import { TaskViewer } from "../TaskViewer";
import { ViewAttachments } from "../ViewAttachments";
import { Expenses } from "./Expenses";

export const ViewTask = memo(
  function ViewTask(_: Propless) {
    const open = useTasks(viewing);
    const task = useTasks(selectScopedTask);
    const controller = useRef<Controller>();
    const [openViewer, setOpen] = useState(false);
    const inputController = useRef<InputController>(null);

    const updateTask = useDebouncer(async (state: IState) => {
      if (!inputController.current) {
        return;
      }
      try {
        const client = new UIClient({ setState: () => {} });
        const result = await client.executeQuery<
          UpdateManagementTaskMutation,
          UpdateManagementTaskMutationVariables
        >(updateManagementTask, {
          id: task.id,
          ...inputController.current.toGQL(state),
        });
        ManagementTasks.updateByID(result.updateManagementTask, false);
      } catch (error) {
        // silence
      }
    }, 500);

    const onImageClick = useCallback((_: GradiumImage, index: number) => {
      setOpen(true);
      controller.current?.flickity?.selectCell?.(index, false, true);
    }, []);

    const onUploadImage = useCallback(
      (image: GradiumImage) => {
        ManagementTasks.partialUpdateByID(task.id, {
          images: [...task.images, image],
        });
      },
      [task.id, task.images],
    );

    const onDeleteImage = useCallback(
      (image: GradiumImage) => {
        ManagementTasks.partialUpdateByID(task.id, {
          images: task.images.filter(img => image.id !== img.id),
        });
      },
      [task.id, task.images],
    );

    const closeViewer = useCallback(() => setOpen(false), []);

    const classes = useClassNames({ "viewer-open": openViewer });

    const toggle = useController(ModalStack.create(onImageClick, closeViewer));

    const cacheFlickity = useCallback((flickity: Controller) => {
      controller.current = flickity;
    }, []);

    return (
      <TaskViewer
        open={open}
        className={classes}
        ref={inputController}
        onUpdate={updateTask.execute}
        close={ManagementTasks.viewTask.close}>
        <ViewAttachments
          id={task.id}
          images={task.images}
          onClick={toggle.open}
          onUpload={onUploadImage}
          imageType={GradiumImageType.TaskImage}
        />
        <Expenses expenses={task.expenses} />
        <ImageViewer
          entityId={task.id}
          open={openViewer}
          close={toggle.close}
          images={task.images}
          onDeleteImage={onDeleteImage}
          controllerRef={cacheFlickity}
          imageType={GradiumImageType.TaskImage}
        />
      </TaskViewer>
    );
  },
  () => true,
);
