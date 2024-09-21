import { memo, useCallback } from "react";
import { AmenitiesTile } from "Components/AmenitiesTile";
import { GradientTransitionLink } from "Components/GradientTransitionButton";
import { LivingSpaceTile } from "Components/LivingSpaceTile";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import { PropertyConfigurationPage } from "Layouts/PropertyConfiguration";
import type { Propless } from "Types/React";
import { NameAndLocation } from "./NameAndLocation";
import { PropertyImages } from "./PropertyImages";
import "./styles.scss";

export default memo(
  function PropertyConfiguration(_: Propless) {
    const property = useCurrentProperty();
    const labelFN = useCallback(
      (property: string) => `Welcome to ${property}`,
      [],
    );
    return (
      <PropertyConfigurationPage labelFN={labelFN}>
        <PropertyImages images={property.images} />
        <NameAndLocation />
        <LivingSpaceTile>
          <GradientTransitionLink
            label="Edit Living Spaces"
            to={`/app/configure/${property.slug}/living-spaces`}
          />
        </LivingSpaceTile>
        <AmenitiesTile>
          <GradientTransitionLink
            label="Edit Amenities"
            to={`/app/configure/${property.slug}/amenities`}
          />
        </AmenitiesTile>
      </PropertyConfigurationPage>
    );
  },
  () => true,
);
