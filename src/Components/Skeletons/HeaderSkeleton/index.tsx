import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type {
  HeaderTags,
  OptionalChildren,
  OptionalClassName,
} from "Types/React";
import "./styles.scss";

export const HeaderSkeleton = memo(function HeaderSkeleton({
  Tag,
  children,
  className,
}: Props) {
  const classes = useClassNames("header-skeleton", className);
  return (
    <Tag className={classes}>
      <span>{children}</span>
    </Tag>
  );
});

interface Props extends OptionalClassName, OptionalChildren {
  Tag: HeaderTags;
}
