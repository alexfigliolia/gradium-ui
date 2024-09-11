import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Page = memo(function Page({ className, children }: Props) {
  const classes = useClassNames("management-section", className);
  return <div className={classes}>{children}</div>;
});

interface Props extends OptionalChildren {
  className?: string;
}
