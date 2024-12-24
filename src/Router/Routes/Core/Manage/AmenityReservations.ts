import { LazyAmenityReservations } from "Pages/AmenityReservations/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";
import { Amenities } from "State/Amenities";
import { AmenitySchedule } from "State/AmenitySchedule";
import { AppLoaders } from "Tools/AppLoaders";

export const AmenityReservations = {
  path: AdminRoutes.slugRoute(":slug", "amenity-reservations"),
  Component: LazyAmenityReservations,
  loader: async () => {
    AmenitySchedule.loading(true);
    await AppLoaders.Properties.get();
    void AmenitySchedule.fetchReservations();
    const amenities = await Amenities.fetch();
    AmenitySchedule.resolveScope(amenities);
    return AmenitySchedule.getState();
  },
};
