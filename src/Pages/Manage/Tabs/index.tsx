import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Tabs = memo(
  function Tabs(_: Propless) {
    const { slug } = useCurrentProperty();
    return (
      <div className="tabs">
        <NavLink to={`/manage/${slug}/leases`} className="leases-link">
          Leases
        </NavLink>
        <NavLink to={`/manage/${slug}/amenities`} className="amenities-link">
          Amenities
        </NavLink>
        <NavLink
          to={`/manage/${slug}/maintenance`}
          className="maintenance-link">
          Maintenance
        </NavLink>
        <NavLink to={`/manage/${slug}/finances`} className="finances-link">
          Finances
        </NavLink>
      </div>
    );
  },
  () => true,
);
