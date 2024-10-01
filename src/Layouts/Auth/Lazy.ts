import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyAuthLayout = CreateLazyComponent({
  loader: () => import("./index"),
});
