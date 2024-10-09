import { LazyPropertyConfigurationPage } from "Pages/PropertyConfiguration/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";

export const PropertyConfiguration = {
  path: AdminRoutes.slugRoute(":slug", "configure"),
  Component: LazyPropertyConfigurationPage,
};
