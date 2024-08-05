import { memo } from "react";
import { ImageSlider } from "Components/ImageSlider";
import { Pin } from "Icons/Pin";
import type { IProperty } from "Models/Properties";
import "./styles.scss";
/* eslint-disable jsx-a11y/label-has-associated-control */

export const PropertyCard = memo(function PropertyCard({
  name,
  images,
  mapsLink,
  address1,
  occupancyRate,
}: IProperty) {
  return (
    <div className="property-card">
      <a className="map-link" href={mapsLink} target="__blank">
        <Pin aria-hidden />
      </a>
      <ImageSlider images={images} />
      <div className="pl-info">
        <h2>{name}</h2>
        <address>
          <p>{address1}</p>
        </address>
        <label className="pl-occupancy">
          <span>
            <span>Occupancy</span>
            <span>{occupancyRate}%</span>
          </span>
          <div>
            <div style={{ width: `${occupancyRate}%` }} />
          </div>
        </label>
      </div>
    </div>
  );
});
