import { Account } from "Icons/Account";
import { Logout } from "Icons/Logout";
import { RelativeLink } from "Layouts/Management/Link";

export class UserRoutes {
  public static readonly ACCOUNT = (
    <RelativeLink
      key="account"
      to="/app/account"
      label="Account"
      Icon={Account}
    />
  );
  public static readonly LOGOUT = (
    <RelativeLink key="logout" to="/app/logout" label="Log Out" Icon={Logout} />
  );

  public static readonly links = [this.ACCOUNT, this.LOGOUT];
}
