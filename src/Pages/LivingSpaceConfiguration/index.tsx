import { Fragment, memo, useCallback } from "react";
import { PermissedRoute } from "Components/PermissedRoute";
import {
  LivingSpaceTile,
  PropertyConfigurationPage,
} from "Layouts/PropertyConfiguration";
import { AdminRoutes } from "Router/AdminRoutes";
import { selectUnits, useLivingSpaces } from "State/LivingSpaces";
import type { Propless } from "Types/React";
import { ConfirmDelete } from "./ConfirmDelete";
import { LivingSpaceForm } from "./LivingSpaceForm";
import { NewSpaceButton } from "./NewSpaceButton";

export default memo(
  function LivingSpaceConfiguration(_: Propless) {
    const labelFN = useCallback(
      (property: string) => `Living Spaces at ${property}`,
      [],
    );
    const spaces = useLivingSpaces(selectUnits);
    return (
      <PermissedRoute
        fallback=".."
        requirements={AdminRoutes.permissions("PROPERTY_CONFIGURATION")}>
        <PropertyConfigurationPage labelFN={labelFN}>
          <LivingSpaceTile>
            <NewSpaceButton />
          </LivingSpaceTile>
          {!!spaces.length && (
            <Fragment>
              {spaces.map((space, i) => {
                return <LivingSpaceForm key={i} index={i} {...space} />;
              })}
              <NewSpaceButton />
            </Fragment>
          )}
        </PropertyConfigurationPage>
        <ConfirmDelete />
      </PermissedRoute>
    );
  },
  () => true,
);
