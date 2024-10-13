import { memo } from "react";
import { Page } from "Components/Page";
import { TriangleLoader } from "Components/TriangleLoader";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const PageLoader = memo(function PageLoader({ label, children }: Props) {
  return (
    <Page className="page-loader" label={label} titleArea={<TriangleLoader />}>
      {children}
    </Page>
  );
});

interface Props extends OptionalChildren {
  label: string;
}
