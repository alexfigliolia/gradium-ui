import type { GradiumImage, UploadSignature } from "GraphQL/Types";
import type { Callback } from "./Generics";
import type { CloudinaryAssetScope } from "./Gradium";

export interface UploadConfig {
  file: File;
  scope: CloudinaryAssetScope;
  signature: UploadSignature;
  notify?: boolean;
}

export type GradiumImageCallback = Callback<[GradiumImage]>;
