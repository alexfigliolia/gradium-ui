import { memo, useCallback, useRef, useState } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { CloudinaryImageInterface } from "Components/CloudinaryImageInterface";
import { Confirmation } from "Components/Confirmation";
import { DropDown } from "Components/DropDown";
import { Input } from "Components/Input";
import { StaffDropDown } from "Components/StaffDropDown";
import { createManagementTask } from "GraphQL/Mutations/createManagementTask.gql";
import type {
  CreateManagementTaskMutation,
  CreateManagementTaskMutationVariables,
  GradiumImage,
  ManagementTaskPriority,
} from "GraphQL/Types";
import { ManagementTaskStatus } from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Check } from "Icons/Check";
import { HighPriority } from "Icons/HighPriority";
import { Title } from "Icons/Title";
import { creating, ManagementTasks, useTasks } from "State/ManagementTasks";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import { Controller } from "./Controller";
import "./styles.scss";

export const CreateTask = memo(function CreateTask(_: Propless) {
  const open = useTasks(creating);
  const form = useRef<HTMLFormElement>(null);
  const [assigned, setAssigned] = useState("");
  const [images, setImages] = useState<GradiumImage[]>([]);
  const [status, setStatus] = useState<string>(ManagementTaskStatus.Todo);
  const [priority, setPriority] = useState<string>("");

  const onUpload = useCallback((image: GradiumImage) => {
    setImages(images => [...images, image]);
  }, []);

  const onDelete = useCallback((image: GradiumImage) => {
    setImages(images => images.filter(img => img.id !== image.id));
  }, []);

  const createTask = useCallback(
    async (data: FormData, setState: ILoadingStateSetter) => {
      const client = new UIClient({ setState });
      try {
        const response = await client.executeQuery<
          CreateManagementTaskMutation,
          CreateManagementTaskMutationVariables
        >(
          createManagementTask,
          {
            title: data.get("title")?.toString?.() ?? "",
            description: data.get("description")?.toString?.() ?? "",
            assignedToId: assigned === "" ? undefined : parseInt(assigned),
            propertyId: Properties.getState().current,
            organizationId: Scope.getState().currentOrganizationId,
            status: status as ManagementTaskStatus,
            priority: priority as ManagementTaskPriority,
            images: images,
          },
          () => {
            ManagementTasks.createTask.close();
            form.current?.reset();
            setAssigned("");
            setImages([]);
            setPriority("");
            setStatus(ManagementTaskStatus.Todo);
          },
        );
        ManagementTasks.push(response.createManagementTask);
      } catch (e) {
        // silence
      }
    },
    [status, priority, assigned, images],
  );

  const { loading, success, error, onSubmit } = useFormState(createTask);

  return (
    <Confirmation
      open={open}
      className="create-maintentance-task"
      close={ManagementTasks.createTask.close}>
      <h2>New Task</h2>
      <p>Tasks you create can be tracked on your maintenace scrum board</p>
      <form ref={form} onSubmit={onSubmit}>
        <Input
          required
          type="text"
          label="Title"
          icon={<Title />}
          name="title"
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
          Create
        </ActionButton>
      </form>
    </Confirmation>
  );
});
