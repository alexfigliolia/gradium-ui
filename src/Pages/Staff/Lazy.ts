import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyStaffPage = CreateLazyComponent({
  loader: () => import("./index"),
});
