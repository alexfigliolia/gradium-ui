import { NavLink } from "react-router-dom";
import { PersonRoleType, PropertyAddonType } from "GraphQL/Types";
import { Building } from "Icons/Building";
import { BuildingsStroked } from "Icons/Buildings";
import { MoneyStroked } from "Icons/Money";
import { Organization } from "Icons/Organization";
import { Performance } from "Icons/Performance";
import { PermissedLink, RelativeLink } from "Layouts/Management";
import type { PropertyWithNullImages } from "Models/Properties";
import { UserRoutes } from "./UserRoutes";

export class AdminRoutes {
  public static readonly ACCESS_CONTROL = {
    PROPERTY_PERFORMANCE: {
      permissions: [PersonRoleType.Manager],
      addons: [],
    },
    ORGANIZATION_STAFF: {
      permissions: [PersonRoleType.Manager],
      addons: [],
    },
    ORGANIZATION_FINANCES: {
      permissions: [PersonRoleType.Owner],
      addons: [],
    },
    ORGANIZATION_CONFIGURATION: {
      permissions: [PersonRoleType.Owner],
      addons: [],
    },
    PROPERTY_CONFIGURATION: {
      permissions: [PersonRoleType.Manager],
      addons: [],
    },
    PROPERTY_LEASES: {
      permissions: [PersonRoleType.Manager],
      addons: [PropertyAddonType.LeaseManagement],
    },
    PROPERTY_AMENITIES: {
      permissions: [PersonRoleType.Manager],
      addons: [PropertyAddonType.AmenityReservations],
    },
    PROPERTY_MAINTENACE: {
      permissions: [PersonRoleType.Maintenance],
      addons: [],
    },
    PROPERTY_FINANCES: {
      permissions: [PersonRoleType.Owner],
      addons: [],
    },
  };

  public static access<K extends keyof typeof AdminRoutes.ACCESS_CONTROL>(
    key: K,
  ) {
    return this.ACCESS_CONTROL[key];
  }

  public static permissions<K extends keyof typeof AdminRoutes.ACCESS_CONTROL>(
    key: K,
  ) {
    return this.access(key).permissions;
  }

  public static addons<K extends keyof typeof AdminRoutes.ACCESS_CONTROL>(
    key: K,
  ) {
    return this.access(key).addons;
  }

  public static readonly PROPERTIES = (
    <RelativeLink
      key="properties"
      to="/app/properties"
      Icon={Building}
      label="Properties"
    />
  );
  public static readonly PERFORMANCE = (
    <PermissedLink
      key="performance"
      to="/app/performance"
      label="Performance"
      Icon={Performance}
      requirements={this.permissions("PROPERTY_PERFORMANCE")}
    />
  );
  public static readonly STAFF = (
    <PermissedLink
      key="staff"
      to="/app/staff"
      label="Staff"
      Icon={Organization}
      requirements={this.permissions("ORGANIZATION_STAFF")}
    />
  );
  public static readonly FINANCES = (
    <PermissedLink
      key="finances"
      to="/app/finances"
      label="Finances"
      Icon={MoneyStroked}
      requirements={this.permissions("ORGANIZATION_FINANCES")}
    />
  );
  public static readonly ORGANIZATION = (
    <PermissedLink
      key="organization"
      Icon={BuildingsStroked}
      label="Organization"
      to="/app/organization"
      requirements={this.permissions("ORGANIZATION_CONFIGURATION")}
    />
  );

  public static propertyLinks(properties: PropertyWithNullImages[]) {
    return properties.map(({ slug, name }) => {
      const link = this.slugRoute(slug);
      return (
        <NavLink key={slug} to={link} className="is-property">
          <span aria-hidden />
          <span>{name}</span>
        </NavLink>
      );
    });
  }

  public static slugRoute(...path: string[]) {
    return ["/app", "manage", ...path].join("/");
  }

  public static links(properties: PropertyWithNullImages[]) {
    return [
      this.PROPERTIES,
      ...this.propertyLinks(properties),
      this.PERFORMANCE,
      this.STAFF,
      this.FINANCES,
      this.ORGANIZATION,
      ...UserRoutes.links,
    ];
  }
}
