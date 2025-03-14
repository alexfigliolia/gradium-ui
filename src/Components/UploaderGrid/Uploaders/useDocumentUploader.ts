import { useEffect, useMemo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { GradiumDocument } from "GraphQL/Types";
import type { Callback } from "Types/Generics";
import type { IUploaderState } from "../types";

export const useDocumentUploader = ({
  url,
  error,
  loading,
  savedDocument,
}: IUploaderState<GradiumDocument>) => {
  const fadeLoader = useRef<Callback<[boolean]>>(null);

  useEffect(() => {
    fadeLoader.current?.(!loading);
  }, [loading]);

  const disabled = useMemo(
    () => !!(loading || error || url || savedDocument),
    [loading, error, url, savedDocument],
  );

  const classes = useClassNames("image-uploader", "document-uploader", {
    loading: !!loading,
    error: !!error,
    saved: !!savedDocument,
  });

  return { classes, disabled, fadeLoader };
};
