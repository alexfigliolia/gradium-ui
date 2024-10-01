import { redirect } from "react-router-dom";
import { LazyCoreLayout } from "Layouts/Core/Lazy";
import { Authentication } from "Tools/Authentication";
import { Account } from "./Account";
import { AmenitiesConfiguration } from "./AmenitiesConfiguration";
import { Dashboard } from "./Dashboard";
import { Home } from "./Home";
import { LivingSpaceConfiguration } from "./LivingSpaceConfiguration";
import { Manage } from "./Manage";
import { Properties } from "./Properties";
import { PropertyConfiguration } from "./PropertyConfiguration";

export const Core = {
  path: "/app",
  Component: LazyCoreLayout,
  loader: async () => {
    if (await Authentication.isAuthenticated()) {
      return null;
    }
    throw redirect("/register/login");
  },
  children: [
    Home,
    Manage,
    Account,
    Dashboard,
    Properties,
    PropertyConfiguration,
    AmenitiesConfiguration,
    LivingSpaceConfiguration,
  ],
};
