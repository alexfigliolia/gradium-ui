import type { ChangeEvent, MouseEvent } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Closer } from "Components/Closer";
import { Uploader } from "Components/Uploader";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const UploaderWithPlaceholder = memo(function UploaderWithPlaceholder({
  image,
  onUpload,
  className,
  onCloserClick,
}: Props) {
  const classes = useClassNames(
    "uploader-with-placeholder",
    className,
    !image ? "placeholder" : undefined,
  );
  return (
    <div
      className={classes}
      style={{
        background: image
          ? `url(${image}) no-repeat center / cover`
          : undefined,
      }}>
      {image ? (
        <Closer type="button" onClick={onCloserClick} />
      ) : (
        <Uploader
          multiple
          className={classes}
          style={{
            background: image
              ? `url(${image}) no-repeat center / cover`
              : undefined,
          }}
          onChange={onUpload}
          accept="image/*">
          <div>
            <ImagePlaceholder aria-hidden />
            <p>Click to upload</p>
          </div>
        </Uploader>
      )}
    </div>
  );
});

interface Props {
  image?: string;
  closer?: string;
  className?: string;
  onUpload?: Callback<[e: ChangeEvent<HTMLInputElement>]>;
  onCloserClick?: Callback<[e: MouseEvent<HTMLButtonElement>]>;
}
