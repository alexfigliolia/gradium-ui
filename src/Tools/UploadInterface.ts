import type { ChangeEvent } from "react";
import { saveImage } from "GraphQL/Mutations/saveImage.gql";
import { generateUploadSignature } from "GraphQL/Queries/generateUploadSignature.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  GenerateUploadSignatureQuery,
  GenerateUploadSignatureQueryVariables,
  GradiumImage,
  GradiumImageType,
  SaveImageMutation,
  SaveImageMutationVariables,
  UploadSignature,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { UploadConfig } from "Types/Cloudinary";
import type { Callback } from "Types/Generics";
import type { CloudinaryAssetScope } from "Types/Gradium";
import { CloudinaryDeleter } from "./CloudinaryDeleter";

export class UploadInterface<T extends IUploadInterface> {
  public readonly config: T;
  private static readonly MAX_SIZE = 2 * 1024 * 1024;
  constructor(config: T) {
    this.config = config;
  }

  public readonly onUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    scope: CloudinaryAssetScope,
  ) => {
    const files = UploadInterface.runValidations(e);
    if (!files) {
      return [];
    }
    this.config.onValidFiles?.(files);
    const signature = await this.signUpload(scope.type);
    if (!signature) {
      return [];
    }
    const results = await Promise.all(
      files.map((file, index) =>
        this.uploadFile({
          file,
          index,
          scope,
          signature,
        }),
      ),
    );
    return results.filter(image => !!image);
  };

  private async uploadFile({
    file,
    index,
    scope,
    signature,
  }: UploadConfig & { index: number }) {
    try {
      const url = await this.toCloudinary(file, signature);
      const image = await this.saveImage(url, scope);
      this.config.onSuccess?.(file, image, index);
      return image;
    } catch (error) {
      Toasts.error(
        `Something went wrong while uploading <strong>${file.name}</strong>. Please try again`,
      );
      this.config.onError?.(file, index);
    }
  }

  public static runValidations(e: ChangeEvent<HTMLInputElement>) {
    const files = this.validateEvent(e);
    if (!files) {
      return;
    }
    const filtered = this.validateFiles(files);
    if (!filtered.length) {
      return;
    }
    return filtered;
  }

  private async signUpload(imageType: GradiumImageType) {
    try {
      const response = await graphQLRequest<
        GenerateUploadSignatureQuery,
        GenerateUploadSignatureQueryVariables
      >(generateUploadSignature, {
        imageType,
        organizationId: Scope.getState().currentOrganizationId,
      });
      return response.generateUploadSignature;
    } catch (error) {
      Toasts.error("Something went wrong. Please try again");
    }
  }

  private async saveImage(url: string, scope: CloudinaryAssetScope) {
    try {
      const response = await graphQLRequest<
        SaveImageMutation,
        SaveImageMutationVariables
      >(saveImage, {
        url,
        ...scope,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      return response.saveImage;
    } catch (error) {
      await CloudinaryDeleter.rollBackImage(url, scope.type);
      throw "DB transaction failed";
    }
  }

  private async toCloudinary(file: File, destination: UploadSignature) {
    const { name, __typename: _, ...rest } = destination;
    const data = new FormData();
    data.append("file", file);
    for (const K in rest) {
      const key = K as keyof Omit<UploadSignature, "__typename" | "name">;
      data.append(key, rest[key].toString());
    }
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${name}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );
    const json = await response.json();
    if (!("secure_url" in json)) {
      throw json;
    }
    return json.secure_url as string;
  }

  private static validateEvent(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    if (target.tagName !== "INPUT") {
      return false;
    }
    const input = target as HTMLInputElement;
    const { files } = input;
    if (!files || !files.length) {
      return false;
    }
    const clone = Array.from(files);
    target.value = "";
    return clone;
  }

  private static validateFiles(files: File[]) {
    const validFiles: File[] = [];
    for (const file of files) {
      if (file.size > UploadInterface.MAX_SIZE) {
        Toasts.error(`<strong>${file.name}</strong> cannot exceed 2 megabytes`);
      } else {
        validFiles.push(file);
      }
    }
    return validFiles;
  }
}

interface IUploadInterface {
  onValidFiles?: Callback<[File[]]>;
  onError?: Callback<[File, number]>;
  onSuccess?: Callback<[File, GradiumImage, number]>;
}
