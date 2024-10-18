import { memo } from "react";
import { ImagePlaceholder as PlaceholderIcon } from "Icons/ImagePlaceholder";
import type { Propless } from "Types/React";
import "./styles.scss";

export const ImagePlaceholder = memo(
  function ImagePlaceholder(_: Propless) {
    return (
      <div className="image-placeholder">
        <PlaceholderIcon aria-hidden />
      </div>
    );
  },
  () => true,
);
