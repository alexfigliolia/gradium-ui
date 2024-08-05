import { memo } from "react";
import { Properties, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { PropertyCard } from "./PropertyCard";
import "./styles.scss";
/* eslint-disable jsx-a11y/label-has-associated-control */

export const PropertyList = memo(
  function PropertyList(_: Propless) {
    const properties = useProperties(() => Properties.toList());
    return (
      <div className="property-list">
        {properties.map(property => {
          return <PropertyCard key={property.id} {...property} />;
        })}
      </div>
    );
  },
  () => true,
);
