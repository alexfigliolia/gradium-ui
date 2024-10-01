import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyLoginPage = CreateLazyComponent({
  loader: () => import("./index"),
});
