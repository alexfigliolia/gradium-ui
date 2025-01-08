import { ManagementTasks } from "State/ManagementTasks";
import { AppLoaders } from "Tools/AppLoaders";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async () => {
  ManagementTasks.setLoading(true);
  await AppLoaders.Properties.get();
  await ManagementTasks.fetch();
};

export const LazyPropertyMaintenece = CreateLazyComponent({
  loader: () => import("./index"),
});
