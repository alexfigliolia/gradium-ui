import { ManagementTasks } from "State/ManagementTasks";
import { AppLoaders } from "Tools/AppLoaders";
import { DataSuspender } from "Tools/LazyLoading";

export const Loader = AppLoaders.create(async () => {
  await AppLoaders.Properties.get();
  await ManagementTasks.fetch();
  return ManagementTasks.getState();
});

export const LazyPropertyMaintenece = DataSuspender(() => Loader.get())({
  loader: () => import("./index"),
});
