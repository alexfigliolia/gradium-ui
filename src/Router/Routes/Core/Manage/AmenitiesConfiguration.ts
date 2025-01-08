import {
  LazyAmenitiesConfigurationPage,
  Loader,
} from "Pages/AmenitiesConfiguration/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";

export const AmenitiesConfiguration = {
  path: AdminRoutes.slugRoute(":slug", "configure", "amenities"),
  Component: LazyAmenitiesConfigurationPage,
  loader: () => {
    void Loader();
    return null;
  },
};
