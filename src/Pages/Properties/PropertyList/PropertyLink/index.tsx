import { memo } from "react";
import type { BasicProperty } from "GraphQL/Types";
import { Building } from "Icons/Building";
import { SettingsFilled } from "Icons/Settings";
import { Link } from "./Link";
import { Slider } from "./Slider";
import "./styles.scss";

export const PropertyLink = memo(function PropertyLink({
  slug,
  name,
  city,
  state,
  images,
  zipCode,
  address1,
  address2,
}: BasicProperty) {
  return (
    <div className="property-link">
      <Slider images={images} />
      <div className="pl-info">
        <h3>{name}</h3>
        <address>
          <p>{address1}</p>
          {address2 && <p>{address2}</p>}
          <p>
            {city ? `${city},` : ""} {state} {zipCode}
          </p>
        </address>
        <div>
          <Link
            text="Manage"
            icon={<Building />}
            className="to-manage"
            to={`/app/manage/${slug}`}
          />
          <Link
            text="Configure"
            className="to-configure"
            icon={<SettingsFilled />}
            to={`/app/configure/${slug}`}
          />
        </div>
      </div>
    </div>
  );
});
