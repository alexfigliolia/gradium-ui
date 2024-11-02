import { Amenities } from "State/Amenities";
import { AmenitySchedule } from "State/AmenitySchedule";
import { AppLoaders } from "Tools/AppLoaders";
import { DataSuspender } from "Tools/LazyLoading";
import { PageSkeleton } from "./PageSkeleton";

export const Loader = AppLoaders.create(async () => {
  await AppLoaders.Properties.get();
  void AmenitySchedule.fetchReservations();
  const amenities = await Amenities.fetch();
  AmenitySchedule.resolveScope(amenities);
  return AmenitySchedule.getState();
});

export const LazyAmenityReservations = DataSuspender(async () => {
  await Loader.get();
  Loader.reset();
})({
  loader: () => import("./index"),
  fallback: <PageSkeleton />,
});
