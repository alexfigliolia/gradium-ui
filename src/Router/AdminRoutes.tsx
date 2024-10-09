import { NavLink } from "react-router-dom";
import type { AdminBasicProperty } from "GraphQL/Types";
import { PersonRoleType } from "GraphQL/Types";
import { Building } from "Icons/Building";
import { BuildingsStroked } from "Icons/Buildings";
import { MoneyStroked } from "Icons/Money";
import { Organization } from "Icons/Organization";
import { Performance } from "Icons/Performance";
import { RelativeLink } from "Layouts/Management/Link";
import { PermissionBasedLink } from "Layouts/Management/Link/PermissionBasedLink";
import { UserRoutes } from "./UserRoutes";

export class AdminRoutes {
  public static readonly PROPERTIES = (
    <RelativeLink
      key="properties"
      to="/app/properties"
      Icon={Building}
      label="Properties"
    />
  );
  public static readonly PERFORMANCE = (
    <RelativeLink
      key="performance"
      to="/app/performance"
      label="Performance"
      Icon={Performance}
    />
  );
  public static readonly STAFF = (
    <PermissionBasedLink
      key="staff"
      to="/app/staff"
      label="Staff"
      Icon={Organization}
      permissions={[PersonRoleType.Manager]}
    />
  );
  public static readonly FINANCES = (
    <PermissionBasedLink
      key="finances"
      to="/app/finances"
      label="Finances"
      Icon={MoneyStroked}
      permissions={[PersonRoleType.Owner]}
    />
  );
  public static readonly ORGANIZATION = (
    <PermissionBasedLink
      key="organization"
      Icon={BuildingsStroked}
      label="Organization"
      to="/app/organization"
      permissions={[PersonRoleType.Owner]}
    />
  );

  public static propertyLinks(properties: AdminBasicProperty[]) {
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

  public static slugRoute(slug: string, ...rest: string[]) {
    return ["/app", "manage", slug, ...rest].join("/");
  }

  public static links(properties: AdminBasicProperty[]) {
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
