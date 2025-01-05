import { memo } from "react";
import { MoneyFilled } from "Icons/Money";
import { ManagementTasks } from "State/ManagementTasks";
import type { Propless } from "Types/React";
import "./styles.scss";

export const DummyExpense = memo(
  function DummyExpense(_: Propless) {
    return (
      <button
        className="expense dummy"
        onClick={ManagementTasks.createExpense.open}>
        <MoneyFilled />
        <span>Add an Expense</span>
      </button>
    );
  },
  () => true,
);
