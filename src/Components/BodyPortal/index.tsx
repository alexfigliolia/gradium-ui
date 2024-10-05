import { memo } from "react";
import { createPortal } from "react-dom";
import type { OptionalChildren } from "Types/React";

export const BodyPortal = memo(function BodyPortal({
  children,
}: OptionalChildren) {
  if (typeof document?.body !== "undefined") {
    return createPortal(children, document.body);
  }
  return null;
});
