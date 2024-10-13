import { redirect } from "react-router-dom";
import { LazyCoreLayout } from "Layouts/Core/Lazy";
import { BaseModel } from "Models/BaseModel";
import { AppLoaders } from "Tools/AppLoaders";
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
    try {
      if (!(await AppLoaders.Auth.get())) {
        throw "redirect";
      }
      void AppLoaders.Properties.get();
    } catch (error) {
      AppLoaders.resetAll();
      BaseModel.resetAll();
      throw redirect("/register/login");
    }
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
