import type { ChangeEvent } from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTimeout } from "@figliolia/react-hooks";
import { Closer } from "Components/Closer";
import { ImagePreloader } from "Generics/ImagePreloader";
import type { PropertyImage } from "GraphQL/Types";
import { CloudinaryDeleter } from "Tools/CloudinaryDeleter";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { Callback } from "Types/Generics";
import { ImageFader } from "./ImageFader";
import { ImageUploader } from "./ImageUploader";
import "./styles.scss";

export const CloudinaryImageInterface = memo(function CloudinaryImageInterface({
  image,
}: Props) {
  const timeout = useTimeout();
  const [loading, setLoading] = useState(false);
  const hideLoader = useRef<Callback<[boolean]>>(null);
  const [temp, setTemp] = useState<string | null>(null);

  const onUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    hideLoader.current?.(false);
    setLoading(true);
    const uploader = new CloudinaryUploader(setTemp);
    void uploader.onUpload(e);
  }, []);

  const deleteImage = useCallback(() => {
    if (!image) {
      return;
    }
    hideLoader.current?.(false);
    setLoading(true);
    void CloudinaryDeleter.delete(image).finally(() => {
      hideLoader.current?.(true);
      timeout.execute(() => {
        setLoading(false);
      }, 500);
    });
  }, [timeout, image]);

  const onLoad = useCallback(() => {
    hideLoader.current?.(true);
    timeout.execute(() => {
      setLoading(false);
      setTemp(null);
    }, 500);
  }, [timeout]);

  useEffect(() => {
    if (!image || !temp) {
      return;
    }
    const preloader = new ImagePreloader(image.url, onLoad);
    void preloader.safePreload();
    return () => {
      preloader.destroy();
    };
  }, [image, temp, onLoad]);

  return (
    <div className="cloudinary-image-interface">
      {temp && <ImageFader image={temp} />}
      {image && <ImageFader image={image.url} />}
      {image && !loading ? (
        <Closer type="button" onClick={deleteImage} />
      ) : (
        <ImageUploader ref={hideLoader} loading={loading} onUpload={onUpload} />
      )}
    </div>
  );
});

interface Props {
  image?: PropertyImage;
}
