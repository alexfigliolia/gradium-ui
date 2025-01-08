import { Amenities } from "State/Amenities";
import { AppLoaders } from "Tools/AppLoaders";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async () => {
  await AppLoaders.Properties.get();
  void Amenities.fetch();
};

export const LazyAmenitiesConfigurationPage = CreateLazyComponent({
  loader: () => import("./index"),
});
