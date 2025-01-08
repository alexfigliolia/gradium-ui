import {
  LazyAmenityReservations,
  Loader,
} from "Pages/AmenityReservations/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";

export const AmenityReservations = {
  path: AdminRoutes.slugRoute(":slug", "amenity-reservations"),
  Component: LazyAmenityReservations,
  loader: () => {
    void Loader();
    return null;
  },
};
