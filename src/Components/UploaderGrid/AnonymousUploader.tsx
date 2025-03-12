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
import { ImagePreloader } from "Generics/ImagePreloader";
import type { GradiumDocument, GradiumImage } from "GraphQL/Types";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import { FileUploader } from "./FileUploader";
import type { IUploaderState } from "./useUploader";
import "./styles.scss";

function AnonymousUploaderComponent<T extends "image" | "document">(
  { className, type }: Props<T>,
  ref: ForwardedRef<IAnonymousUploader>,
) {
  const clearInput = useRef<Callback>(null);
  const controller = useController(new Controller());
  const classes = useClassNames("upload-grid", className);
  const [uploading, setUploading] = useState<AnonymousImage<T>[]>([]);

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

  const markLoadingAtIndex = useCallback((index: number, loading = true) => {
    setUploading(ps =>
      ps.map((state, i) => (i === index ? { ...state, loading } : state)),
    );
  }, []);

  const upload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = CloudinaryUploader.runValidations(e);
      if (!files?.length) {
        return;
      }
      const ID = controller.cache(uploading.length);
      const nextState: AnonymousImage<T>[] = files.map(file => {
        const id = parseInt(controller.ID()) * -1;
        const url = URL.createObjectURL(file);
        let savedDocument: GradiumDocument | GradiumImage;
        if (type === "document") {
          savedDocument = {
            id,
            url,
            thumbnail: "",
          };
        } else {
          savedDocument = {
            id,
            url,
          };
        }
        return {
          url,
          file,
          type,
          loading: true,
          savedDocument,
        };
      });
      setUploading(ps => [...ps, ...nextState]);
      void Promise.all(
        nextState.map(({ url }, i) => {
          if (url) {
            return new ImagePreloader(url, () => {
              markLoadingAtIndex(controller.get(ID) + i, false);
            }).safePreload();
          }
        }),
      );
    },
    [controller, markLoadingAtIndex, uploading.length, type],
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) {
        return;
      }
      upload(e);
    },
    [upload],
  );

  const spliceImage = useCallback(
    (index: number) => {
      setUploading(ps =>
        ps.filter((_, i) => {
          if (i !== index) {
            return true;
          }
          controller.decrementAll(i);
          return false;
        }),
      );
    },
    [controller],
  );

  const deleteGenerator = useCallback(
    (index: number) => {
      return () => {
        spliceImage(index);
      };
    },
    [spliceImage],
  );

  return (
    <div className={classes}>
      {uploading.map((state, index) => (
        <FileUploader
          {...state}
          key={index}
          onChange={onChange}
          onDelete={deleteGenerator(index)}
        />
      ))}
      <FileUploader
        key="last"
        type={type}
        ref={clearInput}
        onChange={onChange}
      />
    </div>
  );
}

export const AnonymousUploader = memo(
  forwardRef(AnonymousUploaderComponent),
) as typeof AnonymousUploaderComponent;

export interface AnonymousImage<T extends "image" | "document">
  extends Omit<IUploaderState<T>, "error"> {
  file: File;
}

interface Props<T extends "image" | "document"> {
  type: T;
  className?: string;
  ref?: ForwardedRef<IAnonymousUploader>;
}

export interface IAnonymousUploader {
  clear: Callback;
  getFiles: () => File[];
}
