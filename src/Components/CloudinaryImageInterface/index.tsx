import type { ChangeEvent } from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useController } from "@figliolia/react-hooks";
import { Closer } from "Components/Closer";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import type { Callback } from "Types/Generics";
import { Controller, type IState } from "./Controller";
import { ImageFader } from "./ImageFader";
import type { IImageUploader } from "./ImageUploader";
import { ImageUploader } from "./ImageUploader";
import "./styles.scss";

export const CloudinaryImageInterface = memo(function CloudinaryImageInterface({
  type,
  image,
  disabled,
  entityId,
  onUpload,
  onDelete,
}: Props) {
  const [state, setState] = useState<IState>({
    loading: false,
    temporaryImage: null,
  });
  const uploader = useRef<IImageUploader>(null);
  const controller = useController(new Controller(setState, uploader));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const requirements = { type, entityId };
      if (!Controller.DEV_WARN(requirements)) {
        return;
      }
      void controller.onUpload(e, requirements).then(img => {
        if (img && onUpload) {
          onUpload(img);
        }
      });
    },
    [controller, type, entityId, onUpload],
  );

  const deleteImage = useCallback(() => {
    const requirements = { type, entityId };
    if (!image || !Controller.DEV_WARN(requirements)) {
      return;
    }
    void controller.deleteImage(image, requirements).then(img => {
      if (img && onDelete) {
        onDelete(img);
      }
    });
  }, [type, image, controller, onDelete, entityId]);

  useEffect(() => {
    if (!image || !state.temporaryImage) {
      return;
    }
    const preloader = controller.preloadImage(image.url);
    return () => {
      preloader.destroy();
    };
  }, [image, state.temporaryImage, controller]);

  return (
    <div className="cloudinary-image-interface">
      {state.temporaryImage && <ImageFader image={state.temporaryImage} />}
      {image && <ImageFader image={image.url} />}
      {image && !state.loading ? (
        <Closer type="button" onClick={deleteImage} />
      ) : (
        <ImageUploader
          ref={uploader}
          disabled={disabled}
          onChange={onChange}
          loading={state.loading}
        />
      )}
    </div>
  );
});

interface Props {
  disabled?: boolean;
  entityId?: number;
  image?: GradiumImage;
  type?: GradiumImageType;
  onUpload?: Callback<[GradiumImage]>;
  onDelete?: Callback<[GradiumImage]>;
}
