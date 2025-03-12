import { useEffect, useMemo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { GradiumDocument, GradiumImage } from "GraphQL/Types";
import type { Callback } from "Types/Generics";

export const useUploader = <T extends "image" | "document">({
  type,
  url,
  error,
  loading,
  savedDocument,
}: IUploaderState<T>) => {
  const fadeLoader = useRef<Callback<[boolean]>>(null);

  useEffect(() => {
    fadeLoader.current?.(!loading);
  }, [loading]);

  const disabled = useMemo(
    () => !!(loading || error || url || savedDocument),
    [loading, error, url, savedDocument],
  );

  const classes = useClassNames("image-uploader", {
    loading: !!loading,
    error: !!error,
    saved: !!savedDocument,
    documentUploader: type === "document",
  });

  const style = useMemo(
    () =>
      url ? { background: `url(${url}) no-repeat center / cover` } : undefined,
    [url],
  );
  return { classes, style, disabled, fadeLoader };
};

export interface IUploaderState<T extends "image" | "document"> {
  type: T;
  url?: string;
  error?: boolean;
  loading?: boolean;
  savedDocument?: GradiumDocument | GradiumImage;
}
