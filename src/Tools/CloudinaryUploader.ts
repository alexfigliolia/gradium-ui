import type { ChangeEvent } from "react";
import { saveImage } from "GraphQL/Mutations/saveImage.gql";
import { generateUploadSignature } from "GraphQL/Queries/generateUploadSignature.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  GenerateUploadSignatureQuery,
  GenerateUploadSignatureQueryVariables,
  GradiumImageType,
  SaveImageMutation,
  SaveImageMutationVariables,
  UploadSignature,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { Callback } from "Types/Generics";
import type { CloudinaryAssetScope } from "Types/Gradium";
import { CloudinaryDeleter } from "./CloudinaryDeleter";

export class CloudinaryUploader {
  private static MAX_SIZE = 2 * 1024 * 1024;
  private onObjectURL?: Callback<[string[]]>;
  constructor(onObjectUrl: Callback<[string[]]>) {
    this.onObjectURL = onObjectUrl;
  }

  public onUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    scope: CloudinaryAssetScope,
  ) => {
    const files = this.runValidations(e);
    if (!files) {
      return [];
    }
    const destination = await this.signUpload(scope.type);
    if (!destination) {
      return [];
    }
    this.setTemporaryImages(files);
    const results = await Promise.all(
      files.map(file => this.upload(file, scope, destination)),
    );
    return results.filter(image => !!image);
  };

  private async upload(
    file: File,
    scope: CloudinaryAssetScope,
    destination: UploadSignature,
  ) {
    try {
      const url = await this.toCloudinary(file, destination);
      const image = await this.saveImage(url, scope);
      Toasts.success(`<strong>${file.name}</strong> uploaded successfully!`);
      return image;
    } catch (error) {
      Toasts.error(
        `Something went wrong while uploading <strong>${file.name}</strong>. Please try again`,
      );
    }
  }

  private runValidations(e: ChangeEvent<HTMLInputElement>) {
    const files = this.validateEvent(e);
    if (!files) {
      return;
    }
    const filtered = this.validateFile(files);
    if (!filtered.length) {
      return;
    }
    return filtered;
  }

  private async signUpload(type: GradiumImageType) {
    try {
      const response = await graphQLRequest<
        GenerateUploadSignatureQuery,
        GenerateUploadSignatureQueryVariables
      >(generateUploadSignature, {
        type,
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
      await CloudinaryDeleter.rollBack(url, scope.type);
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

  private validateEvent(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    if (target.tagName !== "INPUT") {
      return false;
    }
    const input = target as HTMLInputElement;
    const { files } = input;
    if (!files || !files.length) {
      return false;
    }
    return files;
  }

  private validateFile(files: FileList) {
    const validFiles: File[] = [];
    for (const file of files) {
      if (file.size > CloudinaryUploader.MAX_SIZE) {
        Toasts.error(`<strong>${file.name}</strong> cannot exceed 2 megabytes`);
      } else {
        validFiles.push(file);
      }
    }
    return validFiles;
  }

  private setTemporaryImages(files: File[]) {
    if (this.onObjectURL) {
      this.onObjectURL(files.map(file => URL.createObjectURL(file)));
    }
  }
}
