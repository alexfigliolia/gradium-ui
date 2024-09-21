import { memo } from "react";
import { IconLink } from "Components/IconLink";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import "./styles.scss";

export const AdminNav = memo(
  function AdminNav(_: Propless) {
    return AdminRoutes.navigationRoutes.map(route => {
      return <IconLink key={route.path} {...route} className="core-link" />;
    });
  },
  () => true,
);
