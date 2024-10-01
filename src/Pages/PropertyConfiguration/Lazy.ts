import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyPropertyConfigurationPage = CreateLazyComponent({
  loader: () => import("./index"),
});
