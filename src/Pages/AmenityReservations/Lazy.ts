import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyAmenityReservations = CreateLazyComponent({
  loader: () => import("./index"),
});
