import { LazyCoreLayout, Loader } from "Layouts/Core/Lazy";
import { Account } from "./Account";
import { Home } from "./Home";
import { Logout } from "./Logout";
import { Manage } from "./Manage";
import { Organization } from "./Organization";
import { Properties } from "./Properties";
import { Staff } from "./Staff";

export const Core = {
  path: "/app",
  Component: LazyCoreLayout,
  loader: () => {
    void Loader();
    return null;
  },
  children: [Home, Staff, Manage, Logout, Account, Properties, Organization],
};
