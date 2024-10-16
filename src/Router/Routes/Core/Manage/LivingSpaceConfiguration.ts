import { LazyLivingSPaceConfigurationPage } from "Pages/LivingSpaceConfiguration/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";
import { LivingSpaces } from "State/LivingSpaces";
import { AppLoaders } from "Tools/AppLoaders";

export const LivingSpaceConfiguration = {
  path: AdminRoutes.slugRoute(":slug", "configure", "living-spaces"),
  Component: LazyLivingSPaceConfigurationPage,
  loader: async () => {
    await AppLoaders.Properties.get();
    void LivingSpaces.fetch();
    return null;
  },
};
