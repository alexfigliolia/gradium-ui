import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyAmenitiesConfigurationPage = CreateLazyComponent({
  loader: () => import("./index"),
});
