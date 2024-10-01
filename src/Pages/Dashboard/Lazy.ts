import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyDashboardPage = CreateLazyComponent({
  loader: () => import("./index"),
});
