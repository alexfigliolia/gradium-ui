import type { ForwardedRef } from "react";
import { forwardRef, memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  AnonymousImageUploader,
  type IAnonymousUploader,
} from "Components/UploaderGrid";
import "./styles.scss";

export const AttachFiles = memo(
  forwardRef(function AttachFiles(
    { className }: Props,
    ref: ForwardedRef<IAnonymousUploader>,
  ) {
    const classes = useClassNames("attachment-list", className);
    return <AnonymousImageUploader ref={ref} className={classes} />;
  }),
  () => true,
);

interface Props {
  className?: string;
}
