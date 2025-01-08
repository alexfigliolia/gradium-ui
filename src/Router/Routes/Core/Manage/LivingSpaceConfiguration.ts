import {
  LazyLivingSpaceConfigurationPage,
  Loader,
} from "Pages/LivingSpaceConfiguration/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";

export const LivingSpaceConfiguration = {
  path: AdminRoutes.slugRoute(":slug", "configure", "living-spaces"),
  Component: LazyLivingSpaceConfigurationPage,
  loader: () => {
    void Loader();
    return null;
  },
};
