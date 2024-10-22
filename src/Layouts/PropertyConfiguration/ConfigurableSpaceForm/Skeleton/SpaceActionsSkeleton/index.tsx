import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalClassName } from "Types/React";
import "./styles.scss";

export const SpaceActionsSkeleton = memo(function SpaceActionsSkeleton({
  className,
}: OptionalClassName) {
  const classes = useClassNames("space-actions", "skeleton", className);
  return (
    <div className={classes}>
      <div>Edit</div>
      <div>Upload Photos</div>
      <div>Upload Floorplans </div>
    </div>
  );
});
