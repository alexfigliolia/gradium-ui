import type { ChangeEventHandler, ForwardedRef } from "react";
import { forwardRef, memo, useImperativeHandle, useMemo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { RefObject } from "@fullcalendar/core/preact.js";
import { FadingLoader } from "Components/FadingLoader";
import { Uploader } from "Components/Uploader";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export interface IImageUploader {
  fader: RefObject<Callback<[boolean]>>;
  clearInput: RefObject<Callback>;
}

export const ImageUploader = memo(
  forwardRef(function ImageUploader(
    { onChange, loading, disabled }: Props,
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

    const hidden = useMemo(() => !!loading || !!disabled, [loading, disabled]);
    const pClasses = useClassNames({ hidden });
    return (
      <Uploader
        ref={clearInput}
        accept="image/*"
        disabled={disabled}
        onChange={onChange}>
        <div>
          <div>
            {loading ? (
              <FadingLoader ref={fader} />
            ) : (
              <ImagePlaceholder aria-hidden />
            )}
          </div>
          <p className={pClasses} aria-hidden={hidden}>
            Click to upload
          </p>
        </div>
      </Uploader>
    );
  }),
);

interface Props {
  loading: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
