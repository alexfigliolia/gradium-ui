import { memo } from "react";
import { Attachment } from "Icons/Attachment";
import { MoneyStroked } from "Icons/Money";
import { TaskTag } from "./TaskTag";
import "./styles.scss";

export const TaskTags = memo(function TaskTags({
  totalExpenses,
  totalImages,
}: Props) {
  if (!totalExpenses && !totalImages) {
    return null;
  }
  return (
    <div className="task-tags">
      {!!totalImages && (
        <TaskTag>
          <Attachment />
          {totalImages}
        </TaskTag>
      )}
      {!!totalExpenses && (
        <TaskTag>
          <MoneyStroked />
          {totalExpenses}
        </TaskTag>
      )}
    </div>
  );
});

interface Props {
  totalImages: number;
  totalExpenses: number;
}
