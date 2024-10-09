import { LazyAmenitiesPage } from "Pages/Amenities/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";

export const Amenities = {
  path: AdminRoutes.slugRoute(":slug", "amenities"),
  Component: LazyAmenitiesPage,
};
