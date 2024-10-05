import { memo, useMemo } from "react";
import { AdminRoutes } from "Router/AdminRoutes";
import { Modals } from "State/Modals";
import { allProperties, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import "./styles.scss";
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

export const ManagementLinks = memo(
  function ManagementLinks(_: Propless) {
    const properties = useProperties(allProperties);
    const links = useMemo(() => AdminRoutes.links(properties), [properties]);
    return (
      <nav onClick={Modals.coreMobileMenu.close} className="management-links">
        {links}
      </nav>
    );
  },
  () => true,
);
