import type { ChangeEvent } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Uploader } from "Components/Uploader";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const UploaderWithPlaceholder = memo(function UploaderWithPlaceholder({
  image,
  onUpload,
  className,
}: Props) {
  const classes = useClassNames(
    "uploader-with-placeholder",
    className,
    !image ? "placeholder" : undefined,
  );
  return (
    <Uploader
      className={classes}
      style={{
        background: image
          ? `url(${image}) no-repeat center / cover`
          : undefined,
      }}
      onChange={onUpload}
      accept="image/png, image/jpeg, image/jpg, image/avif, image/webp">
      {!image && (
        <div>
          <ImagePlaceholder aria-hidden />
          <p>Click to upload</p>
        </div>
      )}
    </Uploader>
  );
});

interface Props {
  image?: string;
  className?: string;
  onUpload?: Callback<[e: ChangeEvent<HTMLInputElement>]>;
}
