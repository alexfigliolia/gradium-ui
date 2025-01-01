import type { ChangeEvent } from "react";
import { Fragment, memo, useCallback, useEffect, useRef } from "react";
import { Closer } from "Components/Closer";
import { ImagePreloader } from "Generics/ImagePreloader";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { Callback } from "Types/Generics";
import { ImageFader } from "./ImageFader";
import { ImageUploader } from "./ImageUploader";
import "./styles.scss";

export const BasicImageInterface = memo(function BasicImageInterface({
  url = "",
  onLoad,
  onUpload,
  deleteImage,
  loading = false,
}: Props) {
  const preloading = useRef(false);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = CloudinaryUploader.runValidations(e) || [];
      onUpload(files);
    },
    [onUpload],
  );

  useEffect(() => {
    if (loading && url && !preloading.current) {
      preloading.current = true;
      const preloader = new ImagePreloader(url);
      void preloader.safePreload().then(() => {
        onLoad();
        preloading.current = false;
      });
    }
  }, [loading, url, onLoad]);

  return (
    <div className="cloudinary-image-interface">
      {url && (
        <Fragment>
          <ImageFader image={url} />
          <Closer className="cii-closer" type="button" onClick={deleteImage} />
        </Fragment>
      )}
      {(!url || loading) && (
        <ImageUploader onChange={onChange} loading={loading} />
      )}
    </div>
  );
});

export interface Props {
  loading?: boolean;
  url?: string;
  onLoad: Callback;
  deleteImage: Callback;
  onUpload: Callback<[File[]]>;
}
