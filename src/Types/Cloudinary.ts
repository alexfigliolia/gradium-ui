import type {
  GradiumDocument,
  GradiumImage,
  UploadSignature,
} from "GraphQL/Types";
import type { Callback } from "./Generics";
import type { CloudinaryScope } from "./Gradium";

export interface UploadConfig<T extends "image" | "document"> {
  file: File;
  notify?: boolean;
  scope: CloudinaryScope<T>;
  signature: UploadSignature;
}

export type GradiumImageCallback = Callback<[GradiumImage]>;

export type GradiumDocumentCallback = Callback<[GradiumDocument]>;

export type GradiumUploadCallback<T extends "image" | "document"> = Callback<
  [GradiumAsset<T>]
>;

export type GradiumAsset<T extends "image" | "document"> = T extends "image"
  ? GradiumImage
  : GradiumDocument;
