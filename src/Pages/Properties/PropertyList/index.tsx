import { memo } from "react";
import { ImageSlider } from "Components/ImageSlider";
import { Pin } from "Icons/Pin";
import { Properties, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import "./styles.scss";
/* eslint-disable jsx-a11y/label-has-associated-control */

export const PropertyList = memo(
  function PropertyList(_: Propless) {
    const properties = useProperties(() => Properties.toList());
    console.log(properties);
    return (
      <div className="property-list">
        {properties.map(property => {
          return (
            <div key={property.id} className="pl-property">
              <a className="map-link" href={property.mapsLink} target="__blank">
                <Pin aria-hidden />
              </a>
              <ImageSlider images={property.images} />
              <div className="pl-info">
                <h2>{property.name}</h2>
                <address>
                  <p>{property.address1}</p>
                  {property.address2 && <p>{property.address2}</p>}
                  <p>
                    {property.city}, {property.state}
                  </p>
                  <p>{property.zipCode}</p>
                </address>
                <label className="pl-occupancy">
                  <span>
                    <span>Occupancy</span>
                    <span>{property.occupancyRate}%</span>
                  </span>
                  <div>
                    <div style={{ width: `${property.occupancyRate}%` }} />
                  </div>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
  () => true,
);
