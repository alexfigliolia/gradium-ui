import { LazyPropertyMaintenece, Loader } from "Pages/PropertyMaintenance/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";

export const PropertyMaintenance = {
  path: AdminRoutes.slugRoute(":slug", "maintenance"),
  Component: LazyPropertyMaintenece,
  loader: () => Loader.get(),
};
