import { memo } from "react";
import type { Propless } from "Types/React";
import "./styles.scss";

export const TriangeLoader = memo(function TriangeLoader(_: Propless) {
  return (
    <div
      className="triangle-loader"
      role="progressbar"
      aria-busy={true}
      aria-label="Loading">
      <svg viewBox="0 0 86 80" aria-hidden={true}>
        <polygon points="43 8 79 72 7 72" />
      </svg>
    </div>
  );
});
