import { LazyLivingSPaceConfigurationPage } from "Pages/LivingSpaceConfiguration/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";

export const LivingSpaceConfiguration = {
  path: AdminRoutes.slugRoute(":slug", "configure", "living-spaces"),
  Component: LazyLivingSPaceConfigurationPage,
};
