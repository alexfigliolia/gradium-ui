import type { Dispatch, SetStateAction } from "react";
import { memo, useCallback } from "react";
import { UploaderGrid } from "Components/UploaderGrid";
import type { ImageState } from "Components/UploaderGrid/Image";

export const CreateAttachments = memo(function CreateAttachments({
  images,
  setImages,
}: Props) {
  const onUpload = useCallback(
    (files: File[]) => {
      setImages(ps => [
        ...ps,
        ...files.map(file => ({
          url: URL.createObjectURL(file),
          file,
          loading: true,
        })),
      ]);
    },
    [setImages],
  );

  const onDelete = useCallback(
    (_1: ImageState, index: number) => {
      setImages(ps => ps.filter((_2, i) => i !== index));
    },
    [setImages],
  );

  const clearLoadingState = useCallback(
    (index: number) => {
      setImages(ps =>
        ps.map((img, i) => (i === index ? { ...img, loading: false } : img)),
      );
    },
    [setImages],
  );

  return (
    <div className="attachments">
      <UploaderGrid
        images={images}
        minVisible={3}
        onUpload={onUpload}
        onDelete={onDelete}
        clearLoading={clearLoadingState}
      />
    </div>
  );
});

interface Props {
  images: ImageState[];
  setImages: Dispatch<SetStateAction<ImageState[]>>;
}
