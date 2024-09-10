import { Fragment, memo } from "react";
import { GradientButton } from "Components/GradientButton";
import { Page } from "Components/Page";
import { Modals } from "State/Modals";
import type { Propless } from "Types/React";
import { NewProperty } from "./NewProperty";
import { PropertyList } from "./PropertyList";
import "./styles.scss";

export default memo(
  function Properties(_: Propless) {
    return (
      <Fragment>
        <Page
          className="properties"
          label="Properties"
          titleArea={
            <GradientButton
              className="new-property-button"
              onClick={Modals.newProperty.open}>
              New Property
            </GradientButton>
          }>
          <PropertyList />
        </Page>
        <NewProperty />
      </Fragment>
    );
  },
  () => true,
);
