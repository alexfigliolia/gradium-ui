import { ManagementTasks } from "State/ManagementTasks";
import { AppLoaders } from "Tools/AppLoaders";
import { DataSuspender } from "Tools/LazyLoading";

export const Loader = AppLoaders.create(async () => {
  ManagementTasks.setLoading(true);
  await AppLoaders.Properties.get();
});

export const LazyPropertyMaintenece = DataSuspender(() => Loader.get())({
  loader: () => import("./index"),
});
