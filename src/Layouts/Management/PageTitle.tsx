import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";

export const PageTitle = memo(function PageTitle({
  title,
  children,
  className,
}: Props) {
  const classes = useClassNames("management-page-title", className);
  return (
    <div className={classes}>
      <h2>{title}</h2>
      {children && <div>{children}</div>}
    </div>
  );
});

interface Props extends OptionalChildren {
  title: string;
  className?: string;
}
