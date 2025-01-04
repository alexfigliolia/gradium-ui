import { type ILoadingStateSetter, Timeout } from "@figliolia/react-hooks";
import type { RefObject } from "@fullcalendar/core/preact.js";
import type { ImageState } from "Components/UploaderGrid/Image";
import { createManagementTask } from "GraphQL/Mutations/createManagementTask.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  CreateManagementTaskMutation,
  CreateManagementTaskMutationVariables,
  GradiumImage,
} from "GraphQL/Types";
import { GradiumImageType } from "GraphQL/Types";
import { ManagementTasks } from "State/ManagementTasks";
import { Toasts } from "State/Toasts";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { Callback } from "Types/Generics";
import type { Controller as InputController, IState } from "../TaskViewer";

export class Controller {
  private resetState: Callback;
  private timeout = new Timeout();
  private task: null | IState = null;
  private setState: ILoadingStateSetter;
  private inputs: RefObject<InputController>;
  constructor({ setState, resetState, inputs }: Config) {
    this.inputs = inputs;
    this.setState = setState;
    this.resetState = resetState;
  }

  public cacheTask = (task: IState) => {
    this.task = task;
  };

  public async createTask(images: ImageState[]) {
    if (!this.inputs.current || !this.task) {
      return;
    }
    const { resolve, promise } = Promise.withResolvers<void>();
    this.setState("loading", true);
    const newTask = await this.saveTask(this.inputs.current.toGQL(this.task));
    if (!newTask) {
      return this.setState("error", true);
    }
    const attachments = await this.uploadAttachments(newTask.id, images);
    const result = { ...newTask, images: attachments };
    this.setState("success", true);
    ManagementTasks.push(result);
    this.timeout.execute(() => {
      ManagementTasks.createTask.close();
      this.timeout.execute(() => {
        this.resetState();
        this.inputs?.current?.clearForm?.();
        resolve();
      }, 1000);
    }, 2000);
    return promise;
  }

  private async saveTask(task: CreateManagementTaskMutationVariables) {
    try {
      const response = await graphQLRequest<
        CreateManagementTaskMutation,
        CreateManagementTaskMutationVariables
      >(createManagementTask, task);
      return response.createManagementTask;
    } catch (error) {
      Toasts.error(
        "Something went wrong while creating your task. Please try again",
      );
    }
  }

  private async uploadAttachments(id: number, uploads: ImageState[]) {
    const files: File[] = [];
    for (const { file } of uploads) {
      if (file) {
        files.push(file);
      }
    }
    const attachments = await CloudinaryUploader.uploadBatch(
      {
        entityId: id,
        type: GradiumImageType.TaskImage,
      },
      ...files,
    );
    const images: GradiumImage[] = [];
    for (const attachment of attachments) {
      if (attachment.status === "fulfilled" && attachment.value) {
        images.push(attachment.value);
      }
    }
    return images;
  }
}

interface Config {
  setState: ILoadingStateSetter;
  resetState: Callback;
  inputs: RefObject<InputController>;
}
