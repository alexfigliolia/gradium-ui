import { Fragment, memo } from "react";
import { GradientButton } from "Components/GradientButton";
import { Page } from "Components/Page";
import { Properties } from "State/Properties";
import type { Propless } from "Types/React";
import { LazyNewProperty } from "./NewProperty/Lazy";
import { PropertyList } from "./PropertyList";

export default memo(
  function PropertiesPage(_: Propless) {
    return (
      <Fragment>
        <Page
          className="properties"
          label="Your Properties"
          titleArea={
            <GradientButton
              className="new-property-button"
              onClick={Properties.newProperty.open}>
              New
            </GradientButton>
          }>
          <PropertyList />
        </Page>
        <LazyNewProperty />
      </Fragment>
    );
  },
  () => true,
);
