import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyAmenitiesPage = CreateLazyComponent({
  loader: () => import("./index"),
});
