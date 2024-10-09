import { redirect } from "react-router-dom";
import { LazyCoreLayout } from "Layouts/Core/Lazy";
import { BaseModel } from "Models/BaseModel";
import { Properties as PropertyState } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import { Authentication } from "Tools/Authentication";
import { Account } from "./Account";
import { Dashboard } from "./Dashboard";
import { Home } from "./Home";
import { Logout } from "./Logout";
import { Manage } from "./Manage";
import { Organization } from "./Organization";
import { Properties } from "./Properties";
import { Staff } from "./Staff";

export const Core = {
  path: "/app",
  Component: LazyCoreLayout,
  loader: async () => {
    if (!(await Authentication.isAuthenticated())) {
      BaseModel.resetAll();
      throw redirect("/register/login");
    }
    const scope = await Scope.initialize();
    if (scope.affiliations.length) {
      void PropertyState.initialize(
        scope.currentOrganizationId,
        scope.currentPermissions,
      );
      return scope;
    }
    Toasts.toast({
      type: "error",
      duration: 15000,
      message:
        "Your user account is not associated with any Gradium organizations. This could mean you've been removed from your organization. If you believe this to be a mistake, please contact us or your organization's administractor",
    });
    return null;
  },
  children: [
    Home,
    Staff,
    Manage,
    Logout,
    Account,
    Dashboard,
    Properties,
    Organization,
  ],
};
