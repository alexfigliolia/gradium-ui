import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalClassName } from "Types/React";
import "Components/Input/styles.scss";
import "./styles.scss";

export const InputSkeleton = memo(function InputSkeleton({
  className,
}: OptionalClassName) {
  const classes = useClassNames("input", "skeleton", className);
  return <div className={classes} />;
});
