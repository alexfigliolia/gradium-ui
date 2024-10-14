import { AppLoaders } from "Tools/AppLoaders";
import { DataSuspender } from "Tools/LazyLoading";

export const LazyManagePage = DataSuspender(() => AppLoaders.Properties.get())({
  loader: () => import("./index"),
});
