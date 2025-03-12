import type { ChangeEvent } from "react";
import type { GradiumDocument, GradiumImage } from "GraphQL/Types";
import { Toasts } from "State/Toasts";
import type { GradiumAsset } from "Types/Cloudinary";
import type { Callback } from "Types/Generics";
import type {
  CloudinaryDocumentScope,
  CloudinaryImageScope,
  CloudinaryScope,
} from "Types/Gradium";
import { CloudinaryUploader } from "./CloudinaryUploader";

export class UploadInterface<T extends "image" | "document"> {
  public readonly config: IUploadInterface<T>;
  constructor(config: IUploadInterface<T>) {
    this.config = config;
  }

  public onUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    scope: CloudinaryScope<T>,
  ) => {
    if (this.isImageScope(scope)) {
      return this.onUploadImage(e, scope);
    }
    return this.onUploadDocument(e, scope);
  };

  public async onUploadImage(
    e: ChangeEvent<HTMLInputElement>,
    scope: CloudinaryImageScope,
  ) {
    const files = CloudinaryUploader.runValidations(e);
    if (!files) {
      return [];
    }
    this.config.onValidFiles?.(files);
    const signature = await CloudinaryUploader.signImageUpload(scope.type);
    if (!signature) {
      return [];
    }
    const results = await Promise.all(
      files.map((file, index) =>
        CloudinaryUploader.uploadImageFile({
          file,
          scope,
          signature,
          notify: false,
        }).then(img => {
          if (img) {
            this.config.onSuccess?.(file, img as GradiumAsset<T>, index);
            return img;
          } else {
            Toasts.error(
              `Something went wrong while uploading <strong>${file.name}</strong>. Please try again`,
            );
            this.config.onError?.(file, index);
          }
        }),
      ),
    );
    return results.filter(image => !!image);
  }

  public async onUploadDocument(
    e: ChangeEvent<HTMLInputElement>,
    scope: CloudinaryDocumentScope,
  ) {
    const files = CloudinaryUploader.runValidations(e);
    if (!files) {
      return [];
    }
    this.config.onValidFiles?.(files);
    const signature = await CloudinaryUploader.signDocumentUpload(scope.type);
    if (!signature) {
      return [];
    }
    const results = await Promise.all(
      files.map((file, index) =>
        CloudinaryUploader.uploadDocumentFile({
          file,
          scope,
          signature,
        }).then(document => {
          if (document) {
            this.config.onSuccess?.(file, document as GradiumAsset<T>, index);
            return document;
          } else {
            this.config.onError?.(file, index);
          }
        }),
      ),
    );
    return results.filter(document => !!document);
  }

  private isImageScope(
    scope: CloudinaryImageScope | CloudinaryDocumentScope,
  ): scope is CloudinaryImageScope {
    return this.config.type === "image" && !!scope;
  }
}

interface IUploadInterface<T extends "image" | "document"> {
  type: T;
  onValidFiles?: Callback<[File[]]>;
  onError?: Callback<[File, number]>;
  onSuccess?: Callback<
    [File, T extends "image" ? GradiumImage : GradiumDocument, number]
  >;
}
