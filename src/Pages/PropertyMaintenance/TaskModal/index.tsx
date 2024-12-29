import type { ChangeEvent, ForwardedRef } from "react";
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
import { useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import { Confirmation } from "Components/Confirmation";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { StaffDropDown } from "Components/StaffDropDown";
import type {
  CreateManagementTaskMutationVariables,
  GradiumImage,
  ManagementTask,
  ManagementTaskPriority,
} from "GraphQL/Types";
import { ManagementTaskStatus } from "GraphQL/Types";
import { Check } from "Icons/Check";
import { HighPriority } from "Icons/HighPriority";
import { Title } from "Icons/Title";
import { ManagementTaskModel } from "Models/ManagementTasks";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import "./styles.scss";

export const TaskModal = memo(
  forwardRef(function TaskModal(
    {
      open,
      close,
      actionText,
      onFormSubmit,
      title: modalTitle,
      task = ManagementTaskModel.EMPTY_TASK,
    }: Props,
    ref: ForwardedRef<Callback>,
  ) {
    const form = useRef<HTMLFormElement>(null);
    const [assigned, setAssigned] = useState(
      task.assignedTo?.id?.toString?.() ?? "",
    );
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [images, setImages] = useState<GradiumImage[]>(task.images);
    const [status, setStatus] = useState<string>(
      task.status ?? ManagementTaskStatus.Todo,
    );
    const [priority, setPriority] = useState<string>(task.priority);

    useEffect(() => {
      setTitle(task.title);
      setDescription(task.description);
      setAssigned(task.assignedTo?.id?.toString?.() ?? "");
      setImages(task.images);
      setStatus(task.status ?? ManagementTaskStatus.Todo);
      setPriority(task.priority);
    }, [task]);

    const onChangeText = useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "description") {
          setDescription(value);
        } else if (name === "title") {
          setTitle(value);
        }
      },
      [],
    );

    const resetForm = useCallback(() => {
      form.current?.reset();
      setTitle("");
      setDescription("");
      setAssigned("");
      setImages([]);
      setPriority("");
      setStatus(ManagementTaskStatus.Todo);
    }, []);

    useImperativeHandle(ref, () => resetForm, [resetForm]);

    const onUpload = useCallback((image: GradiumImage) => {
      setImages(images => [...images, image]);
    }, []);

    const onDelete = useCallback((image: GradiumImage) => {
      setImages(images => images.filter(img => img.id !== image.id));
    }, []);

    const onAction = useCallback(
      (_: FormData, setState: ILoadingStateSetter) => {
        void onFormSubmit(
          {
            ...task,
            title,
            description,
            assignedToId: assigned === "" ? undefined : parseInt(assigned),
            propertyId: Properties.getState().current,
            organizationId: Scope.getState().currentOrganizationId,
            status: status as ManagementTaskStatus,
            priority: priority as ManagementTaskPriority,
            images: images,
          },
          setState,
        );
      },
      [
        status,
        priority,
        assigned,
        images,
        description,
        onFormSubmit,
        task,
        title,
      ],
    );

    const { loading, success, error, onSubmit } = useFormState(onAction);

    return (
      <Confirmation
        open={open}
        className="create-maintentance-task"
        close={close}>
        <h2>{modalTitle}</h2>
        <p>Tasks you create can be tracked on your maintenace scrum board</p>
        <form ref={form} onSubmit={onSubmit}>
          <Input
            required
            type="text"
            label="Title"
            icon={<Title />}
            name="title"
            value={title}
            onChange={onChangeText}
            autoComplete="off"
          />
          <div className="row">
            <DropDown
              required
              value={priority}
              label="Priority"
              title="Priorities"
              list={Controller.priorityList}
              multiple={false}
              name="priority"
              icon={<HighPriority />}
              onChange={setPriority}
            />
            <DropDown
              required
              value={status}
              label="Status"
              title="Statuses"
              list={Controller.statusList}
              multiple={false}
              name="status"
              icon={<Check />}
              onChange={setStatus}
            />
          </div>
          <StaffDropDown
            multiple={false}
            label="Assign to"
            name="assignedToId"
            value={assigned}
            onChange={setAssigned}
          />
          <Input
            type="textarea"
            label="Description"
            name="description"
            autoComplete="off"
            value={description}
            onChange={onChangeText}
          />
          <div className="attachments">
            <CloudinaryImageInterface
              image={images[0]}
              onUpload={onUpload}
              onDelete={onDelete}
            />
            <CloudinaryImageInterface
              image={images[1]}
              onUpload={onUpload}
              onDelete={onDelete}
            />
            <CloudinaryImageInterface
              image={images[2]}
              onUpload={onUpload}
              onDelete={onDelete}
            />
          </div>
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

interface Props {
  open: boolean;
  title: string;
  task?: ManagementTask;
  close: Callback;
  onFormSubmit: Callback<
    [CreateManagementTaskMutationVariables, ILoadingStateSetter],
    void | Promise<void>
  >;
  actionText: string;
}
