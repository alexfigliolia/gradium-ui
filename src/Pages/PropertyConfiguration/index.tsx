import { memo, useCallback, useMemo } from "react";
import { GradientTransitionLink } from "Components/GradientTransitionButton";
import { PermissedRoute } from "Components/PermissedRoute";
import {
  AmenitiesTile,
  LivingSpaceTile,
  PropertyConfigurationPage,
} from "Layouts/PropertyConfiguration";
import { AdminRoutes } from "Router/AdminRoutes";
import { currentProperty, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { AddonsTile } from "./AddonsTile";
import { LazyInfoModals } from "./InfoModals/Lazy";
import { NameAndLocation } from "./NameAndLocation";
import { PropertyImages } from "./PropertyImages";
import "./styles.scss";

export default memo(
  function PropertyConfiguration(_: Propless) {
    const { images, slug } = useProperties(currentProperty);
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
      <PermissedRoute
        fallback=".."
        requirements={AdminRoutes.permissions("PROPERTY_CONFIGURATION")}>
        <PropertyConfigurationPage labelFN={labelFN}>
          <PropertyImages images={images} />
          <NameAndLocation />
          <AddonsTile />
          <LivingSpaceTile>
            <GradientTransitionLink
              label="Edit Living Spaces"
              to={livingSpaceRoute}
            />
          </LivingSpaceTile>
          <AmenitiesTile>
            <GradientTransitionLink
              label="Edit Amenities"
              to={amenitiesRoute}
            />
          </AmenitiesTile>
        </PropertyConfigurationPage>
        <LazyInfoModals />
      </PermissedRoute>
    );
  },
  () => true,
);
