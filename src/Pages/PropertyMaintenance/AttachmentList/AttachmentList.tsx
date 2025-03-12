import type { ReactNode } from "react";
import { Fragment, memo, useCallback, useRef } from "react";
import type { Controller } from "Components/TouchSlider";
import { EntityUploader } from "Components/UploaderGrid";
import type { GradiumImage } from "GraphQL/Types";
import type { GradiumImageType } from "GraphQL/Types";
import { useToggle } from "Hooks/useToggle";
import type { GradiumImageCallback } from "Types/Cloudinary";
import type { Callback } from "Types/Generics";
import { ImageViewer } from "../ImageViewer";
import "./styles.scss";

export const AttachmentList = memo(function AttachmentList({
  images,
  imageType,
  onUpload,
  onDelete,
  entityId,
}: Props) {
  const controller = useRef<Controller>();
  const [viewerOpen, viewerToggle] = useToggle();
  const deleteImage = useRef<GradiumImageCallback>(null);

  const onDeleteImage = useCallback(
    (image: GradiumImage) => {
      deleteImage.current?.(image);
      onDelete(image);
    },
    [onDelete],
  );

  const renderItem = useCallback(
    (item: ReactNode, index: number) => {
      return (
        <button
          key={index}
          onClick={() => {
            controller.current?.flickity?.selectCell?.(index, false, true);
            viewerToggle.open();
          }}>
          {item}
        </button>
      );
    },
    [viewerToggle],
  );

  return (
    <Fragment>
      <EntityUploader
        type="image"
        files={images}
        entityId={entityId}
        onUpload={onUpload}
        fileType={imageType}
        renderItem={renderItem}
        deleteFile={deleteImage}
        className="attachment-list"
      />
      <ImageViewer
        images={images}
        open={viewerOpen}
        entityId={entityId}
        imageType={imageType}
        close={viewerToggle.close}
        controllerRef={controller}
        onDeleteImage={onDeleteImage}
      />
    </Fragment>
  );
});

interface Props {
  entityId: number;
  images: GradiumImage[];
  imageType: GradiumImageType;
  onToggle?: Callback<[boolean]>;
  onUpload: Callback<[GradiumImage]>;
  onDelete: Callback<[GradiumImage]>;
}
