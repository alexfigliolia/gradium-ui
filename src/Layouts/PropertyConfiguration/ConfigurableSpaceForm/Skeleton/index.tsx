import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { HeaderSkeleton } from "Components/Skeletons";
import { Tile } from "Components/Tile";
import type { OptionalChildren, OptionalClassName } from "Types/React";
import { SpaceActionsSkeleton } from "./SpaceActionsSkeleton";
import { SpaceImagesSkeleton } from "./SpaceImagesSkeleton";

export const FormSkeleton = memo(function FormSkeleton({
  title,
  children,
  className,
  inputGroupClassName,
}: Props) {
  const classes = useClassNames("spaces", className);
  const inputClasses = useClassNames("input-group", inputGroupClassName);
  return (
    <Tile TagName="div" className={classes}>
      <div className="space-title">
        <HeaderSkeleton Tag="h3">{title}</HeaderSkeleton>
      </div>
      <div className={inputClasses}>{children}</div>
      <SpaceActionsSkeleton />
      <SpaceImagesSkeleton />
    </Tile>
  );
});

interface Props extends OptionalChildren, OptionalClassName {
  title: string;
  inputGroupClassName?: string;
}
