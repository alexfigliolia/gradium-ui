import { memo, useCallback, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useDebouncer } from "@figliolia/react-hooks";
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
import type { Propless } from "Types/React";
import { AttachmentList } from "../AttachmentList";
import { DeleteButton } from "../DeleteButton";
import {
  type Controller as InputController,
  ExpenseViewer,
  type IState,
} from "../ExpenseViewer";
import "./styles.scss";

export const ViewExpense = memo(
  function ViewExpense(_: Propless) {
    const open = useTasks(viewingExpense);
    const expense = useTasks(selectScopedExpense);
    const [openViewer, setViewerOpen] = useState(false);
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
        ManagementTasks.updateExpenseByID(result.updateExpense, false);
      } catch (error) {
        // silence
      }
    }, 500);

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

    const classes = useClassNames({ "viewer-open": openViewer });

    return (
      <ExpenseViewer
        open={open}
        className={classes}
        ref={inputController}
        onUpdate={update.execute}
        close={ManagementTasks.viewExpense.close}>
        <AttachmentList
          entityId={expense.id}
          onToggle={setViewerOpen}
          onUpload={onUploadImage}
          onDelete={onDeleteImage}
          images={expense.attachments}
          imageType={GradiumImageType.ExpenseAttachment}
        />
        <DeleteButton
          text="Delete Expense"
          onClick={ManagementTasks.deleteExpense.open}
        />
      </ExpenseViewer>
    );
  },
  () => true,
);
