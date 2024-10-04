import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyOrganizationPage = CreateLazyComponent({
  loader: () => import("./index"),
});
