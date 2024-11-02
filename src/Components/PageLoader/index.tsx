import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Page } from "Components/Page";
import { TriangleLoader } from "Components/TriangleLoader";
import type { OptionalChildren, OptionalClassName } from "Types/React";
import "./styles.scss";

export const PageLoader = memo(function PageLoader({
  label,
  children,
  className,
}: Props) {
  const classes = useClassNames("page-loader", className);
  return (
    <Page className={classes} label={label} titleArea={<TriangleLoader />}>
      {children}
    </Page>
  );
});

interface Props extends OptionalChildren, OptionalClassName {
  label: string;
}
