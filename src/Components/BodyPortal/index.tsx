import { memo, useRef } from "react";
import { createPortal } from "react-dom";
import type { OptionalChildren } from "Types/React";

export const BodyPortal = memo(function BodyPortal({
  children,
}: OptionalChildren) {
  const node = useRef<HTMLElement | null>();
  if (!node.current && typeof document !== "undefined") {
    node.current = document.getElementById("root");
  }
  if (node.current) {
    return createPortal(children, node.current);
  }
  return null;
});
