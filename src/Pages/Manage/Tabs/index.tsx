import { memo, useMemo } from "react";
import { PropertyManagementRoutes } from "Layouts/Management/Routes";
import { currentAddons, isLoading, useProperties } from "State/Properties";
import { grants, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import { ConfigureLink } from "./ConfigureLink";
import { Skeleton } from "./Skeleton";
import { TabLink } from "./TabLink";
import "./styles.scss";

const NOOP_ACCESSOR = () => true;

export const Tabs = memo(
  function Tabs(_: Propless) {
    const loading = useProperties(isLoading);
    const permissions = useScope(grants);
    const addons = useProperties(currentAddons);
    const routeList = useMemo(() => {
      return PropertyManagementRoutes.routeList(
        loading
          ? NOOP_ACCESSOR
          : PropertyManagementRoutes.createAccessor(permissions, addons),
      );
    }, [addons, permissions, loading]);

    return (
      <div className="tabs">
        {routeList.map(route => {
          if (loading) {
            return <Skeleton key={route} route={route} />;
          }
          if (route === "configure") {
            return <ConfigureLink key={route} />;
          }
          return <TabLink key={route} route={route} />;
        })}
      </div>
    );
  },
  () => true,
);
