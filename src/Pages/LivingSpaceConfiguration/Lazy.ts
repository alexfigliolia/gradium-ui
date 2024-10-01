import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyLivingSPaceConfigurationPage = CreateLazyComponent({
  loader: () => import("./index"),
});
