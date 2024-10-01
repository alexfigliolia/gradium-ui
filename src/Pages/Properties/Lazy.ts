import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyPropertiesPage = CreateLazyComponent({
  loader: () => import("./index"),
});
