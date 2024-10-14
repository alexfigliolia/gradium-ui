import { Fragment, memo } from "react";
import { LivingSpaceBed } from "Icons/LivingSpaceBed";
import type { OptionalChildren } from "Types/React";
import { PropertyConfigurationTile } from "../PropertyConfigurationTile";

export const LivingSpaceTile = memo(function LivingSpaceTile({
  children,
}: OptionalChildren) {
  return (
    <PropertyConfigurationTile
      title={
        <Fragment>
          <LivingSpaceBed /> Living Spaces
        </Fragment>
      }
      subtitle="Add entries for all rentable living spaces. If this property can hold multiple leases, create an entry for each living spaces that you plan to rent out. If the property is a single family home with a single lease, create only one entry.">
      {children}
    </PropertyConfigurationTile>
  );
});
