import { memo, useMemo } from "react";
import { PropertyManagementRoutes } from "Layouts/Management/Routes";
import { currentAddons, useProperties } from "State/Properties";
import { grants, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import { TabLink } from "./TabLink";
import "./styles.scss";

export const Tabs = memo(
  function Tabs(_: Propless) {
    const permissions = useScope(grants);
    const addons = useProperties(currentAddons);
    const routeList = useMemo(() => {
      return PropertyManagementRoutes.routeList(
        PropertyManagementRoutes.createAccessor(permissions, addons),
      );
    }, [addons, permissions]);
    return (
      <div className="tabs">
        {routeList.map(route => {
          return <TabLink key={route} route={route} />;
        })}
      </div>
    );
  },
  () => true,
);
