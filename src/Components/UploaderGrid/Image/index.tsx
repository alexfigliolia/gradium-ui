import { memo, useCallback } from "react";
import { BasicImageInterface } from "Components/CloudinaryImageInterface";
import type { Callback } from "Types/Generics";

function ImageComponent<T extends Props>({
  url,
  index,
  loading,
  onDelete,
  onUpload,
  clearLoadingState,
}: T) {
  const deleteImage = useCallback(() => onDelete(index), [index, onDelete]);
  const onLoad = useCallback(
    () => clearLoadingState(index),
    [index, clearLoadingState],
  );
  return (
    <BasicImageInterface
      url={url}
      onLoad={onLoad}
      loading={loading}
      onUpload={onUpload}
      deleteImage={deleteImage}
    />
  );
}

export const Image = memo(ImageComponent) as typeof ImageComponent;

export interface ImageState {
  url?: string;
  file?: File;
  loading?: boolean;
}

export interface Props extends ImageState {
  index: number;
  onDelete: Callback<[number]>;
  onUpload: Callback<[File[]]>;
  clearLoadingState: Callback<[number]>;
}
