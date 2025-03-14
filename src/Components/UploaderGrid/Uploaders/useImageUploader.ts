import { useEffect, useMemo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";
import type { IUploaderState } from "../types";

export const useImageUploader = ({
  url,
  error,
  loading,
  savedDocument,
}: IUploaderState) => {
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
  });

  const style = useMemo(
    () =>
      url ? { background: `url(${url}) no-repeat center / cover` } : undefined,
    [url],
  );

  return { classes, style, disabled, fadeLoader };
};
