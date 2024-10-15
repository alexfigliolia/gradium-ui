import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useController } from "@figliolia/react-hooks";
import { Closer } from "Components/Closer";
import type { PropertyImage } from "GraphQL/Types";
import { Controller, type IState } from "./Controller";
import { ImageFader } from "./ImageFader";
import type { IImageUploader } from "./ImageUploader";
import { ImageUploader } from "./ImageUploader";
import "./styles.scss";

export const CloudinaryImageInterface = memo(function CloudinaryImageInterface({
  image,
}: Props) {
  const [state, setState] = useState<IState>({
    loading: false,
    temporaryImage: null,
  });
  const uploader = useRef<IImageUploader>(null);
  const controller = useController(new Controller(setState, uploader));

  const deleteImage = useCallback(() => {
    if (!image) {
      return;
    }
    controller.deleteImage(image);
  }, [image, controller]);

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
          loading={state.loading}
          onUpload={controller.onUpload}
        />
      )}
    </div>
  );
});

interface Props {
  image?: PropertyImage;
}
