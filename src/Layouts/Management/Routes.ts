import type { PersonRoleType, PropertyAddonType } from "GraphQL/Types";
import { AdminRoutes } from "Router/AdminRoutes";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Permission } from "Tools/Permission";
import type { AccessControl } from "Types/Permission";

export class PropertyManagementRoutes {
  public static routeList(accessor = this.canAccess) {
    const list: string[] = [];
    if (accessor(AdminRoutes.access("PROPERTY_CONFIGURATION"))) {
      list.push("configure");
    }
    if (accessor(AdminRoutes.access("PROPERTY_LEASES"))) {
      list.push("leasing");
    }
    if (accessor(AdminRoutes.access("PROPERTY_AMENITIES"))) {
      list.push("amenity-reservations");
    }
    list.push("maintenance");
    if (accessor(AdminRoutes.access("PROPERTY_FINANCES"))) {
      list.push("finances");
    }
    return list;
  }

  public static getFallback(accessor = this.canAccess) {
    if (accessor(AdminRoutes.access("PROPERTY_CONFIGURATION"))) {
      return "/configure";
    }
    if (accessor(AdminRoutes.access("PROPERTY_LEASES"))) {
      return "/leasing";
    }
    if (accessor(AdminRoutes.access("PROPERTY_AMENITIES"))) {
      return "/amenity-reservations";
    }
    if (accessor(AdminRoutes.access("PROPERTY_FINANCES"))) {
      return "/finances";
    }
    return "/maintenance";
  }

  public static canAccess = ({ addons, permissions }: AccessControl) => {
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

  public static createAccessor(
    grants: Set<PersonRoleType>,
    currentAddons: Set<PropertyAddonType>,
  ) {
    return ({ addons, permissions }: AccessControl) => {
      if (permissions.length) {
        if (!Permission.hasPermission(grants, ...permissions)) {
          return false;
        }
      }
      if (addons.length) {
        if (!addons.every(a => currentAddons.has(a))) {
          return false;
        }
      }
      return true;
    };
  }
}
