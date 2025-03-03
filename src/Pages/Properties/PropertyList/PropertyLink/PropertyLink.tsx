import { memo, useMemo } from "react";
import type { AdminBasicProperty } from "GraphQL/Types";
import { SettingsFilled } from "Icons/Settings";
import { AdminRoutes } from "Router/AdminRoutes";
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
}: AdminBasicProperty) {
  const configure = useMemo(
    () => AdminRoutes.slugRoute(slug, "configure"),
    [slug],
  );
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
            to={configure}
            text="Manage"
            className="to-configure"
            icon={<SettingsFilled />}
          />
        </div>
      </div>
    </div>
  );
});
