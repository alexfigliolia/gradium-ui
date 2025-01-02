import type { ForwardedRef } from "react";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { useController } from "@figliolia/react-hooks";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { StaffDropDown } from "Components/StaffDropDown";
import type { ManagementTask } from "GraphQL/Types";
import { Check } from "Icons/Check";
import { HighPriority } from "Icons/HighPriority";
import { Title } from "Icons/Title";
import { ManagementTaskModel } from "Models/ManagementTasks";
import type { OptionalChildren } from "Types/React";
import type { IState } from "./Controller";
import { Controller } from "./Controller";
import "./styles.scss";

export const TaskInputs = memo(
  forwardRef(function TaskInputs(
    { task = ManagementTaskModel.EMPTY_TASK, children }: Props,
    ref: ForwardedRef<InputController>,
  ) {
    const [formState, setState] = useState<IState>(
      Controller.initialState(task),
    );
    const controller = useController(new Controller(setState));

    useImperativeHandle(
      ref,
      () => ({
        controller,
        getState: () => formState,
      }),
      [controller, formState],
    );

    return (
      <div className="task-inputs">
        <Input
          required
          type="text"
          label="Title"
          icon={<Title />}
          name="title"
          value={formState.title}
          onChange={controller.onChangeText}
          autoComplete="off"
        />
        <StaffDropDown
          multiple={false}
          label="Assign to"
          name="assignedToId"
          value={formState.assigned}
          onChange={controller.setAssigned}
        />
        <div className="row">
          <DropDown
            required
            value={formState.priority}
            label="Priority"
            title="Priorities"
            list={Controller.priorityList}
            multiple={false}
            name="priority"
            icon={<HighPriority />}
            onChange={controller.setPriority}
          />
          <DropDown
            required
            value={formState.status}
            label="Status"
            title="Statuses"
            list={Controller.statusList}
            multiple={false}
            name="status"
            icon={<Check />}
            onChange={controller.setStatus}
          />
        </div>
        <Input
          type="textarea"
          label="Description"
          name="description"
          autoComplete="off"
          value={formState.description}
          onChange={controller.onChangeText}
        />
        <h3>Attachments</h3>
        <div className="task-attachments">{children}</div>
      </div>
    );
  }),
);

interface Props extends OptionalChildren {
  task?: ManagementTask;
}

export interface InputController {
  getState: () => IState;
  controller: Controller;
}
