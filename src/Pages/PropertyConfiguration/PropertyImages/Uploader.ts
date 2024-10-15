import type { ChangeEvent } from "react";
import { createPropertyImage } from "GraphQL/Mutations/createPropertyImage.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  CloudinarySignature,
  CreatePropertyImageMutation,
  CreatePropertyImageMutationVariables,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";

export class Uploader {
  private static MAX_SIZE = 2 * 1024 * 1024;
  private sign: () => Promise<CloudinarySignature>;
  constructor(sign: () => Promise<CloudinarySignature>) {
    this.sign = sign;
  }

  public onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploads = this.validateEvent(e);
    if (!uploads) {
      return;
    }
    const destination = await this.signUpload();
    if (!destination) {
      return;
    }
    const [files, previews] = this.validateFiles(uploads);
    files.forEach((file, i) => {
      const landingIndex = Properties.addTemporaryImage(previews[i]);
      void this.upload(landingIndex, file, destination);
    });
  };

  private async signUpload() {
    try {
      const destination = await this.sign();
      return destination;
    } catch (error) {
      Toasts.error("Something went wrong. Please try again");
    }
  }

  private async upload(
    index: number,
    file: File,
    destination: CloudinarySignature,
  ) {
    const { name, __typename: _, ...rest } = destination;
    const data = new FormData();
    data.append("file", file);
    for (const K in rest) {
      const key = K as keyof Omit<CloudinarySignature, "__typename" | "name">;
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
      Properties.replaceImage(index, response.createPropertyImage);
      Toasts.success(`<strong>${file.name}</strong> uploaded successfully`);
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
    console.log("cloudinary", json);
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

  private validateFiles(fileList: FileList): [File[], string[]] {
    const previews: string[] = [];
    const validFiles: File[] = [];
    for (const file of fileList) {
      if (file.size > Uploader.MAX_SIZE) {
        Toasts.error(
          `<strong><strong>${file.name}<</strong>/strong> cannot exceed 2 megabytes`,
        );
        continue;
      }
      validFiles.push(file);
      previews.push(URL.createObjectURL(file));
    }
    return [validFiles, previews];
  }
}
