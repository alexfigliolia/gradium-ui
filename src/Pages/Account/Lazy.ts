import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyAccountPage = CreateLazyComponent({
  loader: () => import("./index"),
});
