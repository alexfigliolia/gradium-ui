import { memo } from "react";
import { CatchRoute } from "Components/CatchRoute";
import { AdminRoutes } from "Router/AdminRoutes";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Permission } from "Tools/Permission";
import type { AccessControl } from "Types/Permission";
import type { Propless } from "Types/React";

export const ManageCatch = memo(
  function Catch(_: Propless) {
    return <CatchRoute relative to={CatchStack()} />;
  },
  () => true,
);

export const CatchStack = () => {
  if (Access(AdminRoutes.access("PROPERTY_CONFIGURATION"))) {
    return "/configure";
  }
  if (Access(AdminRoutes.access("PROPERTY_LEASES"))) {
    return "/leases";
  }
  if (Access(AdminRoutes.access("PROPERTY_AMENITIES"))) {
    return "/amenities";
  }
  if (Access(AdminRoutes.access("PROPERTY_FINANCES"))) {
    return "/finances";
  }
  return "/maintenance";
};

export const Access = ({ addons, permissions }: AccessControl) => {
  if (permissions.length) {
    const { currentPermissions } = Scope.getState();
    if (!Permission.hasPermission(currentPermissions, ...permissions)) {
      return false;
    }
  }
  if (addons.length) {
    const { currentAddons } = Properties.getState();
    if (!addons.every(a => currentAddons.has(a))) {
      return false;
    }
  }
  return true;
};
