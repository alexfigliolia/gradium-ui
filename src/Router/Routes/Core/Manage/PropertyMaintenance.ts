import { LazyPropertyMaintenece, Loader } from "Pages/PropertyMaintenance/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";
import { ManagementTasks } from "State/ManagementTasks";

export const PropertyMaintenance = {
  path: AdminRoutes.slugRoute(":slug", "maintenance"),
  Component: LazyPropertyMaintenece,
  loader: async () => {
    await Loader.get();
    await ManagementTasks.fetch();
    return ManagementTasks.getState();
  },
};
