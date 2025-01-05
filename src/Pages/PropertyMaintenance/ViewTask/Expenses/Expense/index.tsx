import { memo, useMemo } from "react";
import type { Expense as IExpense } from "GraphQL/Types";
import { Dates } from "Tools/Dates";
import { Numbers } from "Tools/Numbers";
import "./styles.scss";

export const Expense = memo(function Expense({
  cost,
  title,
  totalCost,
  createdAt,
  description,
}: Props) {
  const dateDisplay = useMemo(
    () => Dates.format(new Date(createdAt)),
    [createdAt],
  );
  const float = useMemo(() => parseFloat(cost), [cost]);
  const formattedCost = useMemo(() => Numbers.formatCurrency(float), [float]);
  const portion = useMemo(
    () => ((float * 100) / totalCost).toFixed(0),
    [float, totalCost],
  );

  return (
    <button className="expense">
      <div className="title">
        <div>{title}</div>
        <div>Created on {dateDisplay}</div>
      </div>
      <div className="description">{description}</div>
      <div className="meta">
        <div className="cost">
          <span>{formattedCost}</span>
        </div>
        {float !== totalCost && <div className="percentage">{portion}%</div>}
      </div>
    </button>
  );
});

interface Props extends IExpense {
  totalCost: number;
}
