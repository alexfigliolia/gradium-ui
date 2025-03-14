import type { ChangeEvent, MutableRefObject, ReactNode } from "react";
import type { GradiumImage } from "GraphQL/Types";
import type { Callback } from "Types/Generics";

export interface IUploaderState<
  T extends Omit<GradiumImage, "__typename"> = GradiumImage,
> {
  url?: string;
  error?: boolean;
  loading?: boolean;
  savedDocument?: T;
}

export interface IAnonymousUploader {
  clear: Callback;
  getFiles: () => File[];
}

export interface EntityState<
  T extends Omit<GradiumImage, "__typename"> = GradiumImage,
> {
  uploading: IUploaderState<T>[];
  initialFiles: IUploaderState<T>[];
}

export interface EntityProps<
  T extends Omit<GradiumImage, "__typename"> = GradiumImage,
> {
  min?: number;
  entityId: number;
  className?: string;
  files: T[];
  onUpload: Callback<[T]>;
  onDelete?: Callback<[T]>;
  renderItem?: Callback<[ReactNode, number], ReactNode>;
  deleteFile?: MutableRefObject<Callback<[T]> | undefined>;
  uploadFile?: MutableRefObject<
    Callback<[ChangeEvent<HTMLInputElement>]> | undefined
  >;
}
