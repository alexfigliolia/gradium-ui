import { memo, useCallback, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController, useDebouncer } from "@figliolia/react-hooks";
import type { Controller } from "Components/TouchSlider";
import { updateManagementTask } from "GraphQL/Mutations/updateManagementTask.gql";
import type {
  GradiumImage,
  UpdateManagementTaskMutation,
  UpdateManagementTaskMutationVariables,
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
import type { Controller as InputController, IState } from "../TaskViewer";
import { TaskViewer } from "../TaskViewer";
import { Attachments } from "./Attachments";
import { Expenses } from "./Expenses";
import { ImageViewer } from "./ImageViewer";

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
        ManagementTasks.updateByID(result.updateManagementTask);
      } catch (error) {
        // silence
      }
    }, 500);

    const onImageClick = useCallback((_: GradiumImage, index: number) => {
      setOpen(true);
      controller.current?.flickity?.selectCell?.(index, false, true);
    }, []);

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
        <Attachments id={task.id} images={task.images} onClick={toggle.open} />
        <Expenses expenses={task.expenses} />
        <ImageViewer
          open={openViewer}
          close={toggle.close}
          images={task.images}
          controllerRef={cacheFlickity}
        />
      </TaskViewer>
    );
  },
  () => true,
);
