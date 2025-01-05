import { memo, useMemo } from "react";
import type { Expense as IExpense } from "GraphQL/Types";
import { Numbers } from "Tools/Numbers";
import { DummyExpense } from "./DummyExpense";
import { Expense } from "./Expense";
import "./styles.scss";

export const Expenses = memo(function Expenses({ expenses }: Props) {
  const totalCost = useMemo(
    () => expenses.reduce((acc, next) => (acc += parseFloat(next.cost)), 0),
    [expenses],
  );
  const formattedCost = useMemo(
    () => Numbers.formatCurrency(totalCost),
    [totalCost],
  );
  return (
    <div className="expenses">
      <div className="title">
        <div className="title-text">Expenses</div>
        {totalCost !== 0 && (
          <div className="sub-text">
            Total Cost: <strong>{formattedCost}</strong>
          </div>
        )}
      </div>
      <div className="list">
        {expenses.map(expense => (
          <Expense key={expense.id} totalCost={totalCost} {...expense} />
        ))}
        <DummyExpense />
      </div>
    </div>
  );
});

interface Props {
  expenses: IExpense[];
}
