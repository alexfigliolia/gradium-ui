import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import { AmenitiesLink } from "./AmenitiesLink";
import { ConfigureLink } from "./ConfigurationLink";
import { FinancesLink } from "./FinancesLink";
import { LeasesLink } from "./LeasesLink";
import "./styles.scss";

export const Tabs = memo(
  function Tabs(_: Propless) {
    const { slug } = useCurrentProperty();
    const maintentance = useMemo(
      () => AdminRoutes.slugRoute(slug, "maintenance"),
      [slug],
    );
    return (
      <div className="tabs">
        <ConfigureLink />
        <LeasesLink />
        <AmenitiesLink />
        <NavLink to={maintentance} className="maintenance-link">
          Maintenance
        </NavLink>
        <FinancesLink />
      </div>
    );
  },
  () => true,
);
