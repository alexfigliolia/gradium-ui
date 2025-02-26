import { memo, useCallback, useMemo } from "react";
import { type Expense as IExpense } from "GraphQL/Types";
import { Attachment } from "Icons/Attachment";
import { TaskTag } from "Pages/PropertyMaintenance/TaskTags";
import { ManagementTasks } from "State/ManagementTasks";
import { Dates } from "Tools/Dates";
import { Numbers } from "Tools/Numbers";
import "./styles.scss";

export const Expense = memo(function Expense({
  totalCost,
  totalExpenses,
  ...expense
}: Props) {
  const { cost, title, createdAt, description } = expense;
  const dateDisplay = useMemo(
    () => Dates.format(new Date(createdAt)),
    [createdAt],
  );
  const float = useMemo(() => parseFloat(cost), [cost]);
  const formattedCost = useMemo(() => Numbers.formatCurrency(float), [float]);
  const portion = useMemo(() => {
    const portion = (float * 100) / totalCost;
    return isNaN(portion) ? 0 : portion.toFixed(0);
  }, [float, totalCost]);

  const onClick = useCallback(() => {
    ManagementTasks.viewExpense.open(expense);
  }, [expense]);

  return (
    <button onClick={onClick} className="expense">
      <div className="title">
        <div>{title}</div>
        <div>Created on {dateDisplay}</div>
      </div>
      <div className="description">{description}</div>
      <div className="meta">
        <div className="cost">
          <span>{formattedCost}</span>
        </div>
        {!!totalExpenses && <div className="percentage">{portion}%</div>}
      </div>
      {!!expense.attachments.length && (
        <TaskTag>
          <Attachment />
          <span>{expense.attachments.length}</span>
        </TaskTag>
      )}
    </button>
  );
});

interface Props extends IExpense {
  totalCost: number;
  totalExpenses?: number;
}
