import type { ForwardedRef } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useController, useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { Confirmation } from "Components/Confirmation";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { StaffDropDown } from "Components/StaffDropDown";
import type {
  CreateManagementTaskMutationVariables,
  ManagementTask,
} from "GraphQL/Types";
import { Check } from "Icons/Check";
import { HighPriority } from "Icons/HighPriority";
import { Title } from "Icons/Title";
import { ManagementTaskModel } from "Models/ManagementTasks";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import { Controller, type IState } from "./Controller";
import "./styles.scss";

export const TaskModal = memo(
  forwardRef(function TaskModal(
    {
      open,
      close,
      children,
      actionText,
      onFormSubmit,
      title: modalTitle,
      task = ManagementTaskModel.EMPTY_TASK,
      subtitle = "Tasks you create can be tracked on your board. Assigned staff members will be notified when receiving new tasks.",
    }: Props,
    ref: ForwardedRef<Callback>,
  ) {
    const form = useRef<HTMLFormElement>(null);
    const [formState, setState] = useState<IState>(
      Controller.initialState(task),
    );
    const controller = useController(new Controller(setState));

    useEffect(() => {
      controller.resetState(task);
    }, [task, controller]);

    const reset = useCallback(() => {
      controller.clearForm();
    }, [controller]);

    const onAction = useCallback(
      (_: FormData, setState: ILoadingStateSetter, resetState: Callback) => {
        void onFormSubmit(controller.toGQL(formState), setState, resetState);
      },
      [controller, formState, onFormSubmit],
    );

    useImperativeHandle(ref, () => reset, [reset]);

    const { loading, success, error, onSubmit } = useFormState(onAction);

    return (
      <Confirmation
        open={open}
        className="create-maintentance-task"
        close={close}>
        <h2>{modalTitle}</h2>
        <p>{subtitle}</p>
        <form ref={form} onSubmit={onSubmit}>
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
          <ActionButton
            type="submit"
            error={!!error}
            success={success}
            loading={loading}>
            {actionText}
          </ActionButton>
        </form>
      </Confirmation>
    );
  }),
);

interface Props extends OptionalChildren {
  open: boolean;
  title: string;
  subtitle?: string;
  task?: ManagementTask;
  close: Callback;
  onFormSubmit: Callback<
    [SubmitTaskArgs, ILoadingStateSetter, Callback],
    void | Promise<void>
  >;
  actionText: string;
}

export type SubmitTaskArgs = Omit<
  CreateManagementTaskMutationVariables,
  "images"
>;
