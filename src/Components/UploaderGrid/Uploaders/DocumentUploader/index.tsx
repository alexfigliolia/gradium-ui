import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Closer } from "Components/Closer";
import { FadingLoader } from "Components/FadingLoader";
import { Uploader } from "Components/Uploader";
import type { IUploaderState } from "Components/UploaderGrid";
import type { GradiumDocument } from "GraphQL/Types";
import { Document } from "Icons/Document";
import { Error } from "Icons/Error";
import type { Callback } from "Types/Generics";
import { useDocumentUploader } from "../useDocumentUploader";
import "./styles.scss";

export const DocumentUploader = memo(
  forwardRef(function DocumentUploader(
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
    const { classes, disabled, fadeLoader } = useDocumentUploader({
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
        onChange={onChange}
        className={classNames}
        accept="application/pdf"
        disabled={uploadDisabled}>
        {savedDocument && onDelete && !isDisabled && (
          <Closer onClick={onDelete} aria-label="Delete Document" />
        )}
        <div className="upload-action">
          <Document aria-hidden />
          <p aria-hidden={disabled}>Upload Document</p>
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

export interface Props extends IUploaderState<GradiumDocument> {
  disabled?: boolean;
  onDelete?: Callback;
  onChange?: Callback<[ChangeEvent<HTMLInputElement>]>;
}
