import { LazyAmenitiesConfigurationPage } from "Pages/AmenitiesConfiguration/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";
import { Amenities } from "State/Amenities";
import { AppLoaders } from "Tools/AppLoaders";

export const AmenitiesConfiguration = {
  path: AdminRoutes.slugRoute(":slug", "configure", "amenities"),
  Component: LazyAmenitiesConfigurationPage,
  loader: async () => {
    await AppLoaders.Properties.get();
    void Amenities.fetch();
    return null;
  },
};
