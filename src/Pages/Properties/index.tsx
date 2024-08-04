import { memo } from "react";
import { GradientButton } from "Components/GradientButton";
import { Page } from "Components/Page";
import type { Propless } from "Types/React";
import { PropertyList } from "./PropertyList";
import "./styles.scss";

export default memo(
  function Properties(_: Propless) {
    return (
      <Page
        className="properties"
        label="Properties"
        titleArea={
          <GradientButton className="new-property">New Property</GradientButton>
        }>
        <PropertyList />
      </Page>
    );
  },
  () => true,
);
