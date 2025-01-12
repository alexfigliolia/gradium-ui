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
import { UploadInterface } from "Tools/UploadInterface";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import type { ImageState } from "./ImageUploader";
import { ImageUploader } from "./ImageUploader";
import "./styles.scss";

export const AnonymousUploader = memo(
  forwardRef(function AnonymousUploader(
    { className }: Props,
    ref: ForwardedRef<IAnonymousUploader>,
  ) {
    const clearInput = useRef<Callback>(null);
    const controller = useController(new Controller());
    const classes = useClassNames("upload-grid", className);
    const [uploading, setUploading] = useState<AnonymousImage[]>([]);

    useImperativeHandle(
      ref,
      () => ({
        clear: () => {
          setUploading([]);
          clearInput.current?.();
        },
        getImages: () => uploading.map(({ file }) => file),
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
        const files = UploadInterface.runValidations(e);
        if (!files?.length) {
          return;
        }
        const ID = controller.cache(uploading.length);
        const nextState = files.map(file => {
          const url = URL.createObjectURL(file);
          return {
            url,
            file,
            loading: true,
            savedImage: {
              url,
              id: parseInt(controller.ID()) * -1,
            },
          };
        });
        setUploading(ps => [...ps, ...nextState]);
        void Promise.all(
          nextState.map(({ url }, i) =>
            new ImagePreloader(url, () => {
              markLoadingAtIndex(controller.get(ID) + i, false);
            }).safePreload(),
          ),
        );
      },
      [controller, markLoadingAtIndex, uploading.length],
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
          <ImageUploader
            {...state}
            onChange={onChange}
            onDelete={deleteGenerator(index)}
            key={index === uploading.length - 1 ? "last" : index}
          />
        ))}
        <ImageUploader key="last" ref={clearInput} onChange={onChange} />
      </div>
    );
  }),
);

export interface AnonymousImage extends Omit<ImageState, "error"> {
  file: File;
}

interface Props {
  className?: string;
}

export interface IAnonymousUploader {
  clear: Callback;
  getImages: () => File[];
}
