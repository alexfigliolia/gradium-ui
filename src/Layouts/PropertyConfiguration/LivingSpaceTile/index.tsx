import { Fragment, memo } from "react";
import { LivingSpaceBed } from "Icons/LivingSpaceBed";
import { selectLoading, useLivingSpaces } from "State/LivingSpaces";
import type { OptionalChildren } from "Types/React";
import { PropertyConfigurationTile } from "../PropertyConfigurationTile";

export const LivingSpaceTile = memo(function LivingSpaceTile({
  children,
}: OptionalChildren) {
  const loading = useLivingSpaces(selectLoading);
  return (
    <PropertyConfigurationTile
      loading={loading}
      title={
        <Fragment>
          <LivingSpaceBed /> Living Spaces
        </Fragment>
      }
      subtitle="Add entries for all rentable living spaces. If this property can hold multiple leases, create an entry for each living space that you plan to rent out. If the property is a single family home with a single lease, create only one entry.">
      {children}
    </PropertyConfigurationTile>
  );
});
