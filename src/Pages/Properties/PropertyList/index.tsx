import { memo } from "react";
import { allProperties, isLoading, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { NoProperties } from "./NoProperties";
import { PropertyLink, PropertyLinkSkeleton } from "./PropertyLink";
import "./styles.scss";

export const PropertyList = memo(
  function PropertyList(_: Propless) {
    const loading = useProperties(isLoading);
    const properties = useProperties(allProperties);
    if (loading) {
      return (
        <div className="property-list">
          <PropertyLinkSkeleton />
        </div>
      );
    }
    if (!properties.length) {
      return <NoProperties />;
    }
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
