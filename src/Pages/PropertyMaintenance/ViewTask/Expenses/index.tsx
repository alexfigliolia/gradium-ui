import { memo, useMemo } from "react";
import type { Expense as IExpense } from "GraphQL/Types";
import { DummyExpense } from "./DummyExpense";
import { Expense } from "./Expense";
import "./styles.scss";

export const Expenses = memo(function Expenses({ expenses }: Props) {
  const totalCost = useMemo(
    () => expenses.reduce((acc, next) => (acc += parseFloat(next.cost)), 0),
    [expenses],
  );
  return (
    <div className="expenses">
      <div className="title">Expenses</div>
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
