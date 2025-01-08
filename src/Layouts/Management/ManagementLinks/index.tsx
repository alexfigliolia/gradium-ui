import { memo, useMemo } from "react";
import { AdminRoutes } from "Router/AdminRoutes";
import { allProperties, isLoading, useProperties } from "State/Properties";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import "./styles.scss";
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

export const ManagementLinks = memo(
  function ManagementLinks(_: Propless) {
    const loading = useProperties(isLoading);
    const properties = useProperties(allProperties);
    const links = useMemo(
      () =>
        loading ? AdminRoutes.skeletonLinks : AdminRoutes.links(properties),
      [loading, properties],
    );
    return (
      <nav onClick={Scope.coreMobileMenu.close} className="management-links">
        {links}
      </nav>
    );
  },
  () => true,
);
