import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyManagePage = CreateLazyComponent({
  loader: () => import("./index"),
});
