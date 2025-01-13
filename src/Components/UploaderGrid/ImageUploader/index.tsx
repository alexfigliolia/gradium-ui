import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, memo, useEffect, useMemo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Closer } from "Components/Closer";
import { FadingLoader } from "Components/FadingLoader";
import { Uploader } from "Components/Uploader";
import type { GradiumImage } from "GraphQL/Types";
import { Error } from "Icons/Error";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const ImageUploader = memo(
  forwardRef(function ImageUploader(
    {
      loading = false,
      error = false,
      url = "",
      savedImage,
      onChange,
      onDelete,
    }: Props,
    ref: ForwardedRef<Callback>,
  ) {
    const fadeLoader = useRef<Callback<[boolean]>>(null);

    useEffect(() => {
      fadeLoader.current?.(!loading);
    }, [loading]);

    const disabled = useMemo(
      () => !!(loading || error || url || savedImage),
      [loading, error, url, savedImage],
    );

    const classes = useClassNames("image-uploader", {
      loading,
      error,
      saved: !!savedImage,
    });

    const style = useMemo(
      () =>
        url
          ? { background: `url(${url}) no-repeat center / cover` }
          : undefined,
      [url],
    );

    return (
      <Uploader
        multiple
        ref={ref}
        style={style}
        accept="image/*"
        disabled={disabled}
        onChange={onChange}
        className={classes}>
        {savedImage && onDelete && (
          <Closer onClick={onDelete} aria-label="delete image" />
        )}
        <div className="upload-action">
          <ImagePlaceholder aria-hidden />
          <p aria-hidden={disabled}>Upload Image</p>
        </div>
        <div className="upload-pending">
          <FadingLoader ref={fadeLoader} initialState={!loading} />
        </div>
        <div className="upload-error">
          <div>
            <Error aria-hidden />
            <p aria-hidden={!error}>Error</p>
          </div>
        </div>
      </Uploader>
    );
  }),
);

export interface Props extends ImageState {
  onDelete?: Callback;
  onChange?: Callback<[ChangeEvent<HTMLInputElement>]>;
}

export interface ImageState {
  url?: string;
  error?: boolean;
  loading?: boolean;
  savedImage?: GradiumImage;
}
