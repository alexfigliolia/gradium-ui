import type { ChangeEvent, ForwardedRef } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useController } from "@figliolia/react-hooks";
import { Closer } from "Components/Closer";
import type { GradiumImage, GradiumImageType } from "GraphQL/Types";
import type { Callback } from "Types/Generics";
import { Controller, type IState } from "./Controller";
import { ImageFader } from "./ImageFader";
import type { IImageUploader } from "./ImageUploader";
import { ImageUploader } from "./ImageUploader";
import "./styles.scss";

export const CloudinaryImageInterface = memo(
  forwardRef(function CloudinaryImageInterface(
    { type, image, disabled, entityId, onUpload, onDelete }: Props,
    ref: ForwardedRef<Controller>,
  ) {
    const [state, setState] = useState<IState>({
      loading: false,
      temporaryImage: null,
    });
    const uploader = useRef<IImageUploader>(null);
    const controller = useController(new Controller(setState, uploader));

    useImperativeHandle(ref, () => controller, [controller]);

    const onChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const requirements = { type, entityId };
        if (!Controller.DEV_WARN(requirements)) {
          return;
        }
        void controller.onUpload(e, requirements).then(images => {
          if (images?.[0] && onUpload) {
            onUpload(images[0]);
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
        {image && !state.loading && !disabled ? (
          <Closer type="button" onClick={deleteImage} />
        ) : (
          <ImageUploader
            ref={uploader}
            onChange={onChange}
            loading={state.loading}
            disabled={disabled || !onUpload}
          />
        )}
      </div>
    );
  }),
);

interface Props {
  disabled?: boolean;
  entityId?: number;
  image?: GradiumImage;
  type?: GradiumImageType;
  onUpload?: Callback<[GradiumImage]>;
  onDelete?: Callback<[GradiumImage]>;
}

export type { Controller } from "./Controller";
