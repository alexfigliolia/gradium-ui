import { LivingSpaces } from "State/LivingSpaces";
import { AppLoaders } from "Tools/AppLoaders";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async () => {
  await AppLoaders.Properties.get();
  void LivingSpaces.fetch();
};

export const LazyLivingSpaceConfigurationPage = CreateLazyComponent({
  loader: () => import("./index"),
});
