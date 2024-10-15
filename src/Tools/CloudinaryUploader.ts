import type { ChangeEvent } from "react";
import { createPropertyImage } from "GraphQL/Mutations/createPropertyImage.gql";
import { generateUploadSignature } from "GraphQL/Queries/generateUploadSignature";
import { graphQLRequest } from "GraphQL/request";
import {
  type CreatePropertyImageMutation,
  type CreatePropertyImageMutationVariables,
  PropertyImageType,
  type QueryGenerateUploadSignatureArgs,
  type UploadSignature,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { Callback } from "Types/Generics";

export class CloudinaryUploader {
  private static MAX_SIZE = 2 * 1024 * 1024;
  private onObjectURL?: Callback<[string]>;
  constructor(onObjectURL: Callback<[string]>) {
    this.onObjectURL = onObjectURL;
  }

  public onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = await this.runValidations(e);
    if (!file) {
      return;
    }
    return this.upload(...file);
  };

  private async runValidations(
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<undefined | [File, UploadSignature]> {
    const upload = this.validateEvent(e);
    if (!upload) {
      return;
    }
    const destination = await this.signUpload();
    if (!destination) {
      return;
    }
    const file = this.validateFile(upload);
    if (!file) {
      return;
    }
    return [file, destination];
  }

  private async signUpload() {
    try {
      const destination = await this.sign();
      return destination;
    } catch (error) {
      Toasts.error("Something went wrong. Please try again");
    }
  }

  private async sign() {
    const response = await graphQLRequest<
      any,
      QueryGenerateUploadSignatureArgs
    >(generateUploadSignature, {
      type: PropertyImageType.PropertyImage,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.generateUploadSignature as UploadSignature;
  }

  private async upload(file: File, destination: UploadSignature) {
    const { name, __typename: _, ...rest } = destination;
    const data = new FormData();
    data.append("file", file);
    for (const K in rest) {
      const key = K as keyof Omit<UploadSignature, "__typename" | "name">;
      data.append(key, rest[key].toString());
    }
    try {
      const url = await this.toCloudinary(name, data);
      const response = await graphQLRequest<
        CreatePropertyImageMutation,
        CreatePropertyImageMutationVariables
      >(createPropertyImage, {
        url,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      Properties.addImage(response.createPropertyImage);
      Toasts.success(`<strong>${file.name}</strong> uploaded successfully`);
      return response.createPropertyImage;
    } catch (error) {
      Toasts.error(
        `Something went wrong while uploading <strong>${file.name}</strong>. Please try again`,
      );
    }
  }

  private async toCloudinary(name: string, data: FormData) {
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
    return files[0];
  }

  private validateFile(file: File) {
    if (file.size > CloudinaryUploader.MAX_SIZE) {
      Toasts.error(`<strong>${file.name}</strong> cannot exceed 2 megabytes`);
      return;
    }
    this.setTemporaryImage(file);
    return file;
  }

  private setTemporaryImage(file: File) {
    if (this.onObjectURL) {
      this.onObjectURL(URL.createObjectURL(file));
    }
  }
}
