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
import type { GradiumDocument } from "GraphQL/Types";
import type { Callback } from "Types/Generics";
import type { AnonymousImage } from "./Controllers/Controller";
import { DocumentController } from "./Controllers/DocumentController";
import type { IAnonymousUploader } from "./types";
import { DocumentUploader } from "./Uploaders/DocumentUploader";
import "./styles.scss";

export const AnonymousDocumentUploader = memo(
  forwardRef(function AnonymousDocumentUploader(
    { className }: Props,
    ref: ForwardedRef<IAnonymousUploader>,
  ) {
    const clearInput = useRef<Callback>(null);
    const classes = useClassNames("upload-grid", className);
    const [uploading, setUploading] = useState<
      AnonymousImage<GradiumDocument>[]
    >([]);
    const controller = useController(new DocumentController(setUploading));

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
          <DocumentUploader
            {...state}
            key={index}
            onChange={onChange}
            onDelete={controller.deleteGenerator(index)}
          />
        ))}
        <DocumentUploader key="last" ref={clearInput} onChange={onChange} />
      </div>
    );
  }),
);

interface Props {
  className?: string;
  ref?: ForwardedRef<IAnonymousUploader>;
}
