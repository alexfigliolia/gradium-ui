import type { ForwardedRef } from "react";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController } from "@figliolia/react-hooks";
import { AutoSizeTextArea } from "Components/AutoSizeTextArea";
import { DataViewer } from "Components/DataViewer";
import { MoneyFilled } from "Icons/Money";
import { selectScopedExpense, useTasks } from "State/ManagementTasks";
import { Dates } from "Tools/Dates";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import type { UpdateProxy } from "../BaseControllers";
import type { IState } from "./Controller";
import { Controller } from "./Controller";
import "./styles.scss";

export const ExpenseViewer = memo(
  forwardRef(function ExpenseViewer(
    { open, close, onUpdate, className, children }: Props,
    ref: ForwardedRef<Controller>,
  ) {
    const expense = useTasks(selectScopedExpense);
    const [state, setState] = useState<IState>(
      Controller.initialState(expense),
    );

    const controller = useController(new Controller(setState, onUpdate));

    useImperativeHandle(ref, () => controller, [controller]);

    const date = useMemo(
      () => Dates.format(new Date(expense.createdAt)),
      [expense.createdAt],
    );

    useEffect(() => {
      setState(Controller.initialState(expense));
    }, [expense]);

    const classes = useClassNames("expense-viewer", className);

    return (
      <DataViewer open={open} className={classes} close={close}>
        <div className="title">
          <MoneyFilled />
          <AutoSizeTextArea
            name="title"
            className="h2"
            value={state.title}
            placeholder="Expense Title"
            onChange={controller.onChangeText}
          />
          <p>
            Created {date} by <strong>{expense.createdBy.name}</strong>
          </p>
        </div>
        <AutoSizeTextArea
          className="p description"
          name="description"
          value={state.description}
          placeholder="Expense Description"
          onChange={controller.onChangeText}
        />
        <div className="cost-input">
          $
          <input
            type="number"
            step={0.01}
            className="cost"
            name="cost"
            value={state.cost}
            placeholder="0.00"
            onChange={controller.onChangeText}
          />
        </div>
        {children}
      </DataViewer>
    );
  }),
);

interface Props extends OptionalChildren {
  open: boolean;
  close: Callback;
  className?: string;
  onUpdate?: UpdateProxy<IState>;
}
