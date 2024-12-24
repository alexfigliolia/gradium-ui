import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { GradientTransitionLink } from "Components/GradientTransitionButton";
import { PermissedRoute } from "Components/PermissedRoute";
import {
  AmenitiesTile,
  LivingSpaceTile,
  PropertyConfigurationPage,
} from "Layouts/PropertyConfiguration";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import { AddonsTile } from "./AddonsTile";
import { LazyInfoModals } from "./InfoModals/Lazy";
import { NameAndLocation } from "./NameAndLocation";
import { PropertyImages } from "./PropertyImages";
import "./styles.scss";

export default memo(
  function PropertyConfiguration(_: Propless) {
    const { slug = "" } = useParams();
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
        <PropertyConfigurationPage labelFN={labelFN} className="base-property">
          <PropertyImages />
          <NameAndLocation />
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
          <AddonsTile />
        </PropertyConfigurationPage>
        <LazyInfoModals />
      </PermissedRoute>
    );
  },
  () => true,
);
