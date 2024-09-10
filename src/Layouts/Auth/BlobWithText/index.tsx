import { memo } from "react";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const BlobWithText = memo(function BlobWithText({
  children,
}: OptionalChildren) {
  return (
    <div className="blob-with-text">
      <div>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M43.5,-43.6C58.8,-28.2,75.2,-14.1,75.1,-0.1C75,14,58.5,28,43.2,41.5C28,55.1,14,68.2,0.8,67.4C-12.4,66.6,-24.8,51.9,-40.6,38.4C-56.4,24.8,-75.5,12.4,-79.4,-3.9C-83.3,-20.2,-72,-40.4,-56.2,-55.8C-40.4,-71.1,-20.2,-81.6,-3,-78.6C14.1,-75.5,28.2,-58.9,43.5,-43.6Z"
            transform="translate(100 100)"
          />
          <BrandSVGGradient id="blobWithText" />
        </svg>
        <div>
          <h1>{children}</h1>
        </div>
      </div>
    </div>
  );
});
