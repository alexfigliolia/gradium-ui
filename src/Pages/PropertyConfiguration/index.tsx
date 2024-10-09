import { memo, useCallback, useMemo } from "react";
import { AmenitiesTile } from "Components/AmenitiesTile";
import { GradientTransitionLink } from "Components/GradientTransitionButton";
import { LivingSpaceTile } from "Components/LivingSpaceTile";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import { PropertyConfigurationPage } from "Layouts/PropertyConfiguration";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import { NameAndLocation } from "./NameAndLocation";
import { PropertyImages } from "./PropertyImages";
import "./styles.scss";

export default memo(
  function PropertyConfiguration(_: Propless) {
    const { images, slug } = useCurrentProperty();
    const labelFN = useCallback(
      (property: string) => `Welcome to ${property}`,
      [],
    );
    const amenitiesRoute = useMemo(
      () => AdminRoutes.slugRoute(slug, "configure/amenities"),
      [slug],
    );
    const livingSpaceRoute = useMemo(
      () => AdminRoutes.slugRoute(slug, "configure/living-spaces"),
      [slug],
    );
    return (
      <PropertyConfigurationPage labelFN={labelFN}>
        <PropertyImages images={images} />
        <NameAndLocation />
        <LivingSpaceTile>
          <GradientTransitionLink
            label="Edit Living Spaces"
            to={livingSpaceRoute}
          />
        </LivingSpaceTile>
        <AmenitiesTile>
          <GradientTransitionLink label="Edit Amenities" to={amenitiesRoute} />
        </AmenitiesTile>
      </PropertyConfigurationPage>
    );
  },
  () => true,
);
