import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyLeasesPage = CreateLazyComponent({
  loader: () => import("./index"),
});
