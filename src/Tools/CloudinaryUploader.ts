import type { ChangeEvent } from "react";
import { saveDocument } from "GraphQL/Mutations/saveDocument.gql";
import { saveImage } from "GraphQL/Mutations/saveImage.gql";
import { generateUploadSignature } from "GraphQL/Queries/generateUploadSignature.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  GenerateUploadSignatureQuery,
  GenerateUploadSignatureQueryVariables,
  GradiumDocumentType,
  GradiumImageType,
  SaveDocumentMutation,
  SaveDocumentMutationVariables,
  SaveImageMutation,
  SaveImageMutationVariables,
  UploadSignature,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { UploadConfig } from "Types/Cloudinary";
import type { Callback } from "Types/Generics";
import type {
  CloudinaryDocumentScope,
  CloudinaryImageScope,
} from "Types/Gradium";
import { CloudinaryDeleter } from "./CloudinaryDeleter";

export class CloudinaryUploader {
  private static readonly MAX_SIZE = 2 * 1024 * 1024;
  private readonly onObjectURL?: Callback<[string[]]>;
  constructor(onObjectUrl?: Callback<[string[]]>) {
    this.onObjectURL = onObjectUrl;
  }

  public readonly onUploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
    scope: CloudinaryImageScope,
  ) => {
    const files = CloudinaryUploader.runValidations(e);
    if (!files) {
      return [];
    }
    const signature = await CloudinaryUploader.signImageUpload(scope.type);
    if (!signature) {
      return [];
    }
    this.setTemporaryImages(files);
    const results = await Promise.all(
      files.map(file =>
        CloudinaryUploader.uploadImageFile({
          file,
          scope,
          signature,
        }),
      ),
    );
    return results.filter(image => !!image);
  };

  public static async uploadImageBatch(
    scope: CloudinaryImageScope,
    ...files: File[]
  ) {
    try {
      const validFiles = this.validateFiles(files);
      const signature = await this.signImageUpload(scope.type);
      if (!signature) {
        return [];
      }
      return Promise.allSettled(
        validFiles.map(file =>
          this.uploadImageFile({
            file,
            scope,
            signature,
            notify: false,
          }),
        ),
      );
    } catch (error) {
      Toasts.error(
        "Something went wrong while uploading your files. Please try again",
      );
      return [];
    }
  }

  public static async uploadDocumentBatch(
    scope: CloudinaryDocumentScope,
    ...files: File[]
  ) {
    try {
      const validFiles = this.validateFiles(files);
      const signature = await this.signDocumentUpload(scope.type);
      if (!signature) {
        return [];
      }
      return Promise.allSettled(
        validFiles.map(file =>
          this.uploadDocumentFile({
            file,
            scope,
            signature,
            notify: false,
          }),
        ),
      );
    } catch (error) {
      Toasts.error(
        "Something went wrong while uploading your files. Please try again",
      );
      return [];
    }
  }

  public static async uploadImageFile({
    file,
    scope,
    signature,
    notify = true,
  }: UploadConfig<"image">) {
    try {
      const url = await this.saveImageToCloudinary(file, signature);
      const image = await this.saveImage(url, scope);
      if (notify) {
        Toasts.success(`<strong>${file.name}</strong> uploaded successfully!`);
      }
      return image;
    } catch (error) {
      Toasts.error(
        `Something went wrong while uploading <strong>${file.name}</strong>. Please try again`,
      );
    }
  }

  public static async uploadDocumentFile({
    file,
    scope,
    signature,
    notify = true,
  }: UploadConfig<"document">) {
    try {
      const { url, thumbnail } = await this.saveDocumentToCloudinary(
        file,
        signature,
      );
      const image = await this.saveDocument(url, thumbnail, scope);
      if (notify) {
        Toasts.success(`<strong>${file.name}</strong> uploaded successfully!`);
      }
      return image;
    } catch (error) {
      Toasts.error(
        `Something went wrong while uploading <strong>${file.name}</strong>. Please try again`,
      );
    }
  }

  public static runValidations(e: ChangeEvent<HTMLInputElement>) {
    const files = this.validateEvent(e);
    if (!files) {
      return;
    }
    const filtered = CloudinaryUploader.validateFiles(files);
    if (!filtered.length) {
      return;
    }
    return filtered;
  }

  public static async signImageUpload(imageType: GradiumImageType) {
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

  public static async signDocumentUpload(documentType: GradiumDocumentType) {
    try {
      const response = await graphQLRequest<
        GenerateUploadSignatureQuery,
        GenerateUploadSignatureQueryVariables
      >(generateUploadSignature, {
        documentType,
        organizationId: Scope.getState().currentOrganizationId,
      });
      return response.generateUploadSignature;
    } catch (error) {
      Toasts.error("Something went wrong. Please try again");
    }
  }

  private static async saveImage(url: string, scope: CloudinaryImageScope) {
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
      await CloudinaryDeleter.rollBackImageDeletion(url, scope.type);
      throw "DB transaction failed";
    }
  }

  private static async saveDocument(
    url: string,
    thumbnail: string,
    scope: CloudinaryDocumentScope,
  ) {
    try {
      const response = await graphQLRequest<
        SaveDocumentMutation,
        SaveDocumentMutationVariables
      >(saveDocument, {
        url,
        thumbnail,
        ...scope,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      return response.saveDocument;
    } catch (error) {
      await CloudinaryDeleter.rollBackDocumentDeletion(url, scope.type);
      throw "DB transaction failed";
    }
  }

  public static async saveImageToCloudinary(
    file: File,
    destination: UploadSignature,
  ) {
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

  public static async saveDocumentToCloudinary(
    file: File,
    destination: UploadSignature,
  ) {
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
    console.log("UPLOAD", json);
    if (!("secure_url" in json)) {
      throw json;
    }
    return {
      url: json.secure_url as string,
      thumbnail: json.secure_thumbnail_url as string,
    };
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
