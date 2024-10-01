import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyCoreLayout = CreateLazyComponent({
  loader: () => import("./index"),
});
