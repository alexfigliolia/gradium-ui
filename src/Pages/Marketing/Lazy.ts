import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyMarketingPage = CreateLazyComponent({
  loader: () => import("./index"),
});
