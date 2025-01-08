import { Amenities } from "State/Amenities";
import { AmenitySchedule } from "State/AmenitySchedule";
import { AppLoaders } from "Tools/AppLoaders";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async () => {
  AmenitySchedule.loading(true);
  await AppLoaders.Properties.get();
  void AmenitySchedule.fetchReservations();
  await Amenities.fetch();
  AmenitySchedule.resolveScope();
};

export const LazyAmenityReservations = CreateLazyComponent({
  loader: () => import("./index"),
});
