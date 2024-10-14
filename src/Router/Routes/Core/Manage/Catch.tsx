import { ManageCatch } from "Pages/Manage/Catch";
import { AdminRoutes } from "Router/AdminRoutes";

export const Catch = {
  path: AdminRoutes.slugRoute(":slug"),
  element: <ManageCatch />,
};
