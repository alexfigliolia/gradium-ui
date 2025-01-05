import { memo, useCallback, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController, useDebouncer } from "@figliolia/react-hooks";
import type { Controller } from "Components/TouchSlider";
import { updateExpense } from "GraphQL/Mutations/updateExpense.gql";
import type {
  GradiumImage,
  UpdateExpenseMutation,
  UpdateExpenseMutationVariables,
} from "GraphQL/Types";
import { GradiumImageType } from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import {
  ManagementTasks,
  selectScopedExpense,
  useTasks,
  viewingExpense,
} from "State/ManagementTasks";
import { ModalStack } from "Tools/ModalStack";
import type { Propless } from "Types/React";
import {
  type Controller as InputController,
  ExpenseViewer,
  type IState,
} from "../ExpenseViewer";
import { ImageViewer } from "../ImageViewer";
import { ViewAttachments } from "../ViewAttachments";

export const ViewExpense = memo(
  function ViewExpense(_: Propless) {
    const open = useTasks(viewingExpense);
    const expense = useTasks(selectScopedExpense);
    const controller = useRef<Controller>();
    const [openViewer, setOpen] = useState(false);
    const inputController = useRef<InputController>(null);

    const update = useDebouncer(async (state: IState) => {
      if (!inputController.current) {
        return;
      }
      try {
        const client = new UIClient({ setState: () => {} });
        const result = await client.executeQuery<
          UpdateExpenseMutation,
          UpdateExpenseMutationVariables
        >(updateExpense, {
          id: expense.id,
          ...inputController.current.toGQL(state),
        });
        ManagementTasks.updateExpenseByID(result.updateExpense);
      } catch (error) {
        // silence
      }
    }, 500);

    const onImageClick = useCallback((_: GradiumImage, index: number) => {
      setOpen(true);
      controller.current?.flickity?.selectCell?.(index, false, true);
    }, []);

    const onDeleteImage = useCallback(
      (image: GradiumImage) => {
        ManagementTasks.updateExpenseByID({
          ...expense,
          attachments: expense.attachments.filter(img => img.id !== image.id),
        });
      },
      [expense],
    );

    const onUploadImage = useCallback(
      (image: GradiumImage) => {
        ManagementTasks.updateExpenseByID({
          ...expense,
          attachments: [...expense.attachments, image],
        });
      },
      [expense],
    );

    const closeViewer = useCallback(() => setOpen(false), []);

    const classes = useClassNames({ "viewer-open": openViewer });

    const toggle = useController(ModalStack.create(onImageClick, closeViewer));

    const cacheFlickity = useCallback((flickity: Controller) => {
      controller.current = flickity;
    }, []);

    return (
      <ExpenseViewer
        open={open}
        className={classes}
        ref={inputController}
        onUpdate={update.execute}
        close={ManagementTasks.viewExpense.close}>
        <ViewAttachments
          id={expense.id}
          onClick={toggle.open}
          images={expense.attachments}
          onUpload={onUploadImage}
          imageType={GradiumImageType.ExpenseAttachment}
        />
        <ImageViewer
          open={openViewer}
          close={toggle.close}
          entityId={expense.id}
          images={expense.attachments}
          controllerRef={cacheFlickity}
          onDeleteImage={onDeleteImage}
          imageType={GradiumImageType.ExpenseAttachment}
        />
      </ExpenseViewer>
    );
  },
  () => true,
);
