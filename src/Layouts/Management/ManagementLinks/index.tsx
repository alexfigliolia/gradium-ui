import { memo, useMemo } from "react";
import { AdminRoutes } from "Router/AdminRoutes";
import { allProperties, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import "./styles.scss";

export const ManagementLinks = memo(
  function ManagementLinks(_: Propless) {
    const properties = useProperties(allProperties);
    const links = useMemo(() => AdminRoutes.links(properties), [properties]);
    return <nav className="management-links">{links}</nav>;
  },
  () => true,
);
