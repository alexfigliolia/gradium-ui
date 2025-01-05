import type { UploadSignature } from "GraphQL/Types";
import type { CloudinaryAssetScope } from "./Gradium";

export interface UploadConfig {
  file: File;
  scope: CloudinaryAssetScope;
  signature: UploadSignature;
  notify?: boolean;
}
