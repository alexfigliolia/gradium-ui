import type { ChangeEventHandler, ForwardedRef } from "react";
import { forwardRef, memo } from "react";
import { FadingLoader } from "Components/FadingLoader";
import { Uploader } from "Components/Uploader";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const ImageUploader = memo(
  forwardRef(function ImageUploader(
    { onUpload, loading }: Props,
    ref: ForwardedRef<Callback<[boolean]>>,
  ) {
    return (
      <Uploader onChange={onUpload} accept="image/*">
        <div>
          <div>
            {loading ? (
              <FadingLoader ref={ref} />
            ) : (
              <ImagePlaceholder aria-hidden />
            )}
          </div>
          {!loading && <p>Click to upload</p>}
        </div>
      </Uploader>
    );
  }),
);

interface Props {
  loading: boolean;
  onUpload: ChangeEventHandler<HTMLInputElement>;
}
