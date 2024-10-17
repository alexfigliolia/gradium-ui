import type { ChangeEventHandler, ForwardedRef } from "react";
import { forwardRef, memo, useImperativeHandle, useMemo, useRef } from "react";
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
    { onChange, loading }: Props,
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
    return (
      <Uploader ref={clearInput} onChange={onChange} accept="image/*">
        <div>
          <div>
            {loading ? (
              <FadingLoader ref={fader} />
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
  onChange: ChangeEventHandler<HTMLInputElement>;
}
