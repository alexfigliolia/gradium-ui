import type { ForwardedRef } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController } from "@figliolia/react-hooks";
import { AutoSizeTextArea } from "Components/AutoSizeTextArea";
import { selectScopedTask, useTasks } from "State/ManagementTasks";
import { Dates } from "Tools/Dates";
import type { Callback } from "Types/Generics";
import type { IHTMLOption, OptionalChildren } from "Types/React";
import type { UpdateProxy } from "../BaseControllers";
import { DataViewer } from "../DataViewer";
import { Assigned } from "./Assigned";
import type { IState } from "./Controller";
import { Controller } from "./Controller";
import { Priority } from "./Priority";
import { Status } from "./Status";
import "./styles.scss";

export const TaskViewer = memo(
  forwardRef(function TaskViewer(
    { open, close, onUpdate, className, children }: Props,
    ref: ForwardedRef<Controller>,
  ) {
    const task = useTasks(selectScopedTask);
    const [assigned, setAssigned] = useState(
      Controller.toHTMLOption(task.assignedTo),
    );
    const [state, setState] = useState<IState>(Controller.initialState(task));

    const controller = useController(new Controller(setState, onUpdate));

    useImperativeHandle(ref, () => controller, [controller]);

    const date = useMemo(
      () => Dates.format(new Date(task.createdAt)),
      [task.createdAt],
    );

    const assignTo = useCallback(
      (value?: IHTMLOption) => {
        setAssigned(value);
        controller.setAssigned(value?.value ?? "");
      },
      [controller],
    );

    useEffect(() => {
      setState(Controller.initialState(task));
      setAssigned(Controller.toHTMLOption(task.assignedTo));
    }, [task]);

    const classes = useClassNames("task-viewer", className);

    return (
      <DataViewer open={open} className={classes} close={close}>
        <div className="title">
          <div className="selectors">
            <Priority
              priority={state.priority}
              onChange={controller.setPriority}
            />
            <Status status={state.status} onChange={controller.setStatus} />
          </div>
          <AutoSizeTextArea
            name="title"
            className="h2"
            value={state.title}
            placeholder="Task Title"
            onChange={controller.onChangeText}
          />
          <p>
            Created {date} by <strong>{task.createdBy.name}</strong>
          </p>
          <Assigned assigned={assigned} onChange={assignTo} />
        </div>
        <AutoSizeTextArea
          className="p"
          name="description"
          value={state.description}
          placeholder="Task Description"
          onChange={controller.onChangeText}
        />
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
