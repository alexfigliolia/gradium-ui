import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Closer } from "Components/Closer";
import { FadingLoader } from "Components/FadingLoader";
import { Uploader } from "Components/Uploader";
import type { IUploaderState } from "Components/UploaderGrid";
import { Error } from "Icons/Error";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Callback } from "Types/Generics";
import { useImageUploader } from "../useImageUploader";
import "./styles.scss";

export const ImageUploader = forwardRef(function ImageUploader(
  {
    loading = false,
    error = false,
    url = "",
    disabled: isDisabled,
    onChange,
    onDelete,
    savedDocument,
  }: Props,
  ref: ForwardedRef<Callback>,
) {
  const { classes, style, disabled, fadeLoader } = useImageUploader({
    url,
    error,
    loading,
    savedDocument,
  });

  const uploadDisabled = useMemo(
    () => !!isDisabled || disabled,
    [isDisabled, disabled],
  );

  const classNames = useClassNames(classes, { disabled: !!isDisabled });

  return (
    <Uploader
      multiple
      ref={ref}
      style={style}
      accept="image/*"
      onChange={onChange}
      className={classNames}
      disabled={uploadDisabled}>
      {savedDocument && onDelete && !isDisabled && (
        <Closer onClick={onDelete} aria-label="Delete image" />
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
});

export interface Props extends IUploaderState {
  disabled?: boolean;
  onDelete?: Callback;
  onChange?: Callback<[ChangeEvent<HTMLInputElement>]>;
}
