import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalClassName } from "Types/React";
import "./styles.scss";

export const CloudinaryImageSkeleton = memo(function CloudinaryImageSkeleton({
  className,
}: OptionalClassName) {
  const classes = useClassNames(
    "cloudinary-image-interface",
    "skeleton",
    className,
  );
  return <div className={classes} />;
});
