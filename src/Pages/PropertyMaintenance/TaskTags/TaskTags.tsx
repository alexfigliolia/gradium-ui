import { memo, useMemo } from "react";
import type { Expense } from "GraphQL/Types";
import { Attachment } from "Icons/Attachment";
import { MoneyStroked } from "Icons/Money";
import { Price } from "Icons/Price";
import { Numbers } from "Tools/Numbers";
import { TaskTag } from "./TaskTag";
import "./styles.scss";

export const TaskTags = memo(function TaskTags({
  expenses,
  totalImages,
}: Props) {
  const totalCost = useMemo(
    () =>
      expenses.reduce((acc, next) => {
        acc += parseFloat(next.cost ?? "0");
        return acc;
      }, 0),
    [expenses],
  );
  const costDisplay = useMemo(
    () => Numbers.formatCurrency(totalCost).slice(1),
    [totalCost],
  );

  if (!expenses.length && !totalImages) {
    return null;
  }
  return (
    <div className="task-tags">
      {!!totalImages && (
        <TaskTag>
          <Attachment />
          <span>{totalImages}</span>
        </TaskTag>
      )}
      {!!expenses.length && (
        <TaskTag>
          <MoneyStroked />
          <span>{expenses.length}</span>
        </TaskTag>
      )}
      {totalCost > 0 && (
        <TaskTag>
          <Price />
          <span>{costDisplay}</span>
        </TaskTag>
      )}
    </div>
  );
});

interface Props {
  totalImages: number;
  expenses: Expense[];
}
