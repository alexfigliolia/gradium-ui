import { memo } from "react";
import { Attachment } from "Icons/Attachment";
import { MoneyStroked } from "Icons/Money";
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
        <div>
          <Attachment />
          {totalImages}
        </div>
      )}
      {!!totalExpenses && (
        <div>
          <MoneyStroked />
          {totalExpenses}
        </div>
      )}
    </div>
  );
});

interface Props {
  totalImages: number;
  totalExpenses: number;
}
