import { memo } from "react";
import type { OptionalChildren } from "Types/React";

export const Blob = memo(function Blob({ children }: OptionalChildren) {
  return (
    <svg
      className="blob-shape"
      viewBox="0 0 200 200"
      aria-hidden={true}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M48,-47.6C60.7,-35.2,68.6,-17.6,66.7,-1.9C64.7,13.8,53,27.5,40.3,39.7C27.5,52,13.8,62.7,4.5,58.1C-4.7,53.6,-9.4,33.8,-25.3,21.6C-41.2,9.4,-68.4,4.7,-72.8,-4.5C-77.3,-13.6,-59.1,-27.2,-43.1,-39.6C-27.2,-51.9,-13.6,-63,2,-65C17.6,-67,35.2,-59.9,48,-47.6Z"
        transform="translate(100 100)"
      />
      {children}
    </svg>
  );
});
