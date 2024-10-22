import { memo, useCallback } from "react";
import { PermissedRoute } from "Components/PermissedRoute";
import {
  LivingSpaceTile,
  PropertyConfigurationPage,
} from "Layouts/PropertyConfiguration";
import { AdminRoutes } from "Router/AdminRoutes";
import { fetching, useLivingSpaces } from "State/LivingSpaces";
import type { Propless } from "Types/React";
import { ConfirmDelete } from "./ConfirmDelete";
import { NewSpaceButton } from "./NewSpaceButton";
import { SpacesList } from "./SpacesList";

export default memo(
  function LivingSpaceConfiguration(_: Propless) {
    const labelFN = useCallback(
      (property: string) => `Living Spaces at ${property}`,
      [],
    );
    const loading = useLivingSpaces(fetching);
    return (
      <PermissedRoute
        fallback=".."
        requirements={AdminRoutes.permissions("PROPERTY_CONFIGURATION")}>
        <PropertyConfigurationPage labelFN={labelFN}>
          <LivingSpaceTile loading={loading} fetchingIndicator>
            <NewSpaceButton />
          </LivingSpaceTile>
          <SpacesList />
        </PropertyConfigurationPage>
        <ConfirmDelete />
      </PermissedRoute>
    );
  },
  () => true,
);
