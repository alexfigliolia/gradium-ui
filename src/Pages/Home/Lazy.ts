import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyHomePage = CreateLazyComponent({
  loader: () => import("./index"),
});
