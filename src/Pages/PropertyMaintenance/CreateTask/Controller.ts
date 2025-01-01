import type { ImageState } from "Components/UploaderGrid/Image";
import { createManagementTask } from "GraphQL/Mutations/createManagementTask.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  CreateManagementTaskMutation,
  CreateManagementTaskMutationVariables,
  GradiumImage,
} from "GraphQL/Types";
import { GradiumImageType } from "GraphQL/Types";
import { Toasts } from "State/Toasts";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";

export class Controller {
  public static async create(
    task: CreateManagementTaskMutationVariables,
    uploads: ImageState[],
  ) {
    const result = await this.createTask(task);
    if (result === "create-error") {
      return;
    }
    const files: File[] = [];
    for (const { file } of uploads) {
      if (file) {
        files.push(file);
      }
    }
    const attachments = await CloudinaryUploader.uploadBatch(
      {
        entityId: result.id,
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
    return { ...result, images };
  }

  private static async createTask(task: CreateManagementTaskMutationVariables) {
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
      return "create-error";
    }
  }
}
