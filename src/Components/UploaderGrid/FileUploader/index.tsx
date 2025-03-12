import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Closer } from "Components/Closer";
import { FadingLoader } from "Components/FadingLoader";
import { Uploader } from "Components/Uploader";
import { Document } from "Icons/Document";
import { Error } from "Icons/Error";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Callback } from "Types/Generics";
import type { IUploaderState } from "../useUploader";
import { useUploader } from "../useUploader";
import "./styles.scss";

function FileUploaderComponent<T extends "image" | "document">(
  {
    type,
    loading = false,
    error = false,
    url = "",
    disabled: isDisabled,
    onChange,
    onDelete,
    savedDocument,
  }: Props<T>,
  ref: ForwardedRef<Callback>,
) {
  const { classes, style, disabled, fadeLoader } = useUploader({
    url,
    type,
    error,
    loading,
    savedDocument,
  });

  const accept = useMemo(
    () => (type === "image" ? "image/*" : "document/pdf"),
    [type],
  );

  const Placeholder = useMemo(
    () => (type === "image" ? ImagePlaceholder : Document),
    [type],
  );

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
      accept={accept}
      onChange={onChange}
      className={classNames}
      disabled={uploadDisabled}>
      {savedDocument && onDelete && !isDisabled && (
        <Closer onClick={onDelete} aria-label={`delete ${type}`} />
      )}
      <div className="upload-action">
        <Placeholder aria-hidden />
        <p aria-hidden={disabled}>Upload {type}</p>
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
}

export const FileUploader = memo(forwardRef(FileUploaderComponent));

export interface Props<T extends "image" | "document">
  extends IUploaderState<T> {
  type: T;
  disabled?: boolean;
  onDelete?: Callback;
  onChange?: Callback<[ChangeEvent<HTMLInputElement>]>;
}
