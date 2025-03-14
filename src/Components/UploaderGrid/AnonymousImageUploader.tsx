import type { ChangeEvent, ForwardedRef } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController } from "@figliolia/react-hooks";
import type { Callback } from "Types/Generics";
import type { AnonymousImage } from "./Controllers/Controller";
import { ImageController } from "./Controllers/ImageController";
import type { IAnonymousUploader } from "./types";
import { ImageUploader } from "./Uploaders/ImageUploader";
import "./styles.scss";

export const AnonymousImageUploader = memo(
  forwardRef(function AnonymousImageUploader(
    { className }: Props,
    ref: ForwardedRef<IAnonymousUploader>,
  ) {
    const clearInput = useRef<Callback>(null);
    const classes = useClassNames("upload-grid", className);
    const [uploading, setUploading] = useState<AnonymousImage[]>([]);
    const controller = useController(new ImageController(setUploading));

    useImperativeHandle(
      ref,
      () => ({
        clear: () => {
          setUploading([]);
          clearInput.current?.();
        },
        getFiles: () => uploading.map(({ file }) => file),
      }),
      [uploading],
    );

    const onChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
          return;
        }
        controller.upload(e, uploading.length);
      },
      [controller, uploading.length],
    );

    return (
      <div className={classes}>
        {uploading.map((state, index) => (
          <ImageUploader
            {...state}
            key={index}
            onChange={onChange}
            onDelete={controller.deleteGenerator(index)}
          />
        ))}
        <ImageUploader key="last" ref={clearInput} onChange={onChange} />
      </div>
    );
  }),
);

interface Props {
  className?: string;
  ref?: ForwardedRef<IAnonymousUploader>;
}
