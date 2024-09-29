import { NavLink } from "react-router-dom";
import { Account } from "Icons/Account";
import { Building } from "Icons/Building";
import { Money } from "Icons/Money";
import { Performance } from "Icons/Performance";
import { ExactLink, RelativeLink } from "Layouts/Management/Link";
import type { IProperty } from "Models/Properties";

export class AdminRoutes {
  public static readonly PROPERTIES = (
    <ExactLink
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
  public static readonly FINANCES = (
    <RelativeLink
      key="finances"
      to="/app/finances"
      label="Finances"
      Icon={Money}
    />
  );
  public static readonly SETTINGS = (
    <ExactLink key="account" to="/app/account" label="Account" Icon={Account} />
  );

  public static propertyLinks(properties: IProperty[]) {
    return properties.map(({ slug, name }) => {
      const link = `/app/manage/${slug}`;
      return (
        <NavLink key={slug} to={link} className="is-property">
          <span aria-hidden />
          <span>{name}</span>
        </NavLink>
      );
    });
  }

  public static links(properties: IProperty[]) {
    return [
      this.PROPERTIES,
      ...this.propertyLinks(properties),
      this.PERFORMANCE,
      this.FINANCES,
      this.SETTINGS,
    ];
  }
}
