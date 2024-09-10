import { memo } from "react";
import { ImagePlaceholder } from "Icons/ImagePlaceholder";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Fallback = memo(
  function Fallback(_: Propless) {
    return (
      <div className="fallback">
        <ImagePlaceholder />
      </div>
    );
  },
  () => true,
);
