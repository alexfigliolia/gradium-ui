import { LazyLeasesPage } from "Pages/Leases/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";

export const Leases = {
  path: AdminRoutes.slugRoute(":slug", "leasing"),
  Component: LazyLeasesPage,
};
