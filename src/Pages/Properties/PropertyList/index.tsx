import { memo } from "react";
import { Properties, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { PropertyLink } from "./PropertyLink";
import "./styles.scss";

export const PropertyList = memo(
  function PropertyList(_: Propless) {
    const properties = useProperties(() => Properties.toList());

    return (
      <div className="property-list">
        {properties.map(property => {
          return <PropertyLink key={property.id} {...property} />;
        })}
      </div>
    );
  },
  () => true,
);
