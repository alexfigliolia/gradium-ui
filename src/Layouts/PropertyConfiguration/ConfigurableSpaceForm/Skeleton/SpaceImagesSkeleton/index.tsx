import { memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { CloudinaryImageSkeleton } from "Components/Skeletons";
import { selectWidth, useScreen } from "State/Screen";
import type { OptionalClassName } from "Types/React";
import { Controller } from "../../SpaceImages/Controller";

export const SpaceImagesSkeleton = memo(
  function SpaceImagesSkeleton({ className }: OptionalClassName) {
    const width = useScreen(selectWidth);
    const fill = useMemo(() => Controller.fillGrid(width, 0), [width]);
    const classes = useClassNames("space-image-grid", "skeleton", className);
    return (
      <div className={classes}>
        {fill.map((_, i) => {
          return <CloudinaryImageSkeleton key={i} />;
        })}
      </div>
    );
  },
  () => true,
);
