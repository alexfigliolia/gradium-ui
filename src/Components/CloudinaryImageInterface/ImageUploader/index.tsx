import type { ChangeEventHandler, ForwardedRef } from "react";
import {
  forwardRef,
  Fragment,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import type { RefObject } from "@fullcalendar/core/preact.js";
import { FadingLoader } from "Components/FadingLoader";
import { Uploader } from "Components/Uploader";
import type { GradiumImage } from "GraphQL/Types";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export interface IImageUploader {
  fader: RefObject<Callback<[boolean]>>;
  clearInput: RefObject<Callback>;
}

export const ImageUploader = memo(
  forwardRef(function ImageUploader(
    { image, onChange, loading, disabled }: Props,
    ref: ForwardedRef<IImageUploader>,
  ) {
    const clearInput = useRef<Callback>(null);
    const fader = useRef<Callback<[boolean]>>(null);

    const publicInterface = useMemo(
      () => ({
        fader,
        clearInput,
      }),
      [],
    );
    useImperativeHandle(ref, () => publicInterface, [publicInterface]);

    const disableUpload = useMemo(
      () => !!disabled || !!loading,
      [disabled, loading],
    );
    const pClasses = useClassNames({ hidden: disableUpload });
    return (
      <Uploader
        multiple
        ref={clearInput}
        accept="image/*"
        disabled={disableUpload}
        onChange={onChange}>
        <div>
          <div>
            {loading ? (
              <FadingLoader ref={fader} />
            ) : (
              <Fragment>{!image && <ImagePlaceholder aria-hidden />}</Fragment>
            )}
          </div>
          <p className={pClasses} aria-hidden={disableUpload}>
            Click to upload
          </p>
        </div>
      </Uploader>
    );
  }),
);

interface Props {
  loading?: boolean;
  disabled?: boolean;
  image?: GradiumImage;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
