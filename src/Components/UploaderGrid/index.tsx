import { Fragment, memo, useCallback } from "react";
import { useMinVisible } from "Hooks/useMinVisible";
import type { Callback } from "Types/Generics";
import type { ImageState } from "./Image";
import { Image } from "./Image";

function UploaderGridComponent<T extends ImageState>({
  minVisible,
  images = [],
  onUpload,
  onDelete,
  clearLoading,
}: Props<T>) {
  const visibleCells = useMinVisible(images.length, minVisible);

  const deleteImage = useCallback(
    (index: number) => {
      onDelete(images[index], index);
    },
    [onDelete, images],
  );

  return (
    <Fragment>
      {visibleCells.map((_, i) => (
        <Image
          key={i}
          index={i}
          url={images[i]?.url}
          onUpload={onUpload}
          onDelete={deleteImage}
          loading={images[i]?.loading}
          clearLoadingState={clearLoading}
        />
      ))}
    </Fragment>
  );
}

export const UploaderGrid = memo(
  UploaderGridComponent,
) as typeof UploaderGridComponent;

interface Props<T extends ImageState> {
  minVisible: number;
  images?: T[];
  onUpload: Callback<[File[]]>;
  clearLoading: Callback<[number]>;
  onDelete: Callback<[image: T, index: number]>;
}
