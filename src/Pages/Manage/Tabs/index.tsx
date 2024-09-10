import { memo } from "react";
import { NavLink } from "react-router-dom";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Tabs = memo(
  function Tabs(_: Propless) {
    return (
      <div className="tabs">
        <NavLink to="/leases" className="leases-link active">
          Leases
        </NavLink>
        <NavLink to="/amenities" className="amenities-link">
          Amenities
        </NavLink>
        <NavLink to="/maintenance" className="maintenance-link">
          Maintenance
        </NavLink>
        <NavLink to="/finances" className="finances-link">
          Finances
        </NavLink>
      </div>
    );
  },
  () => true,
);
