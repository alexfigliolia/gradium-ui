import { CatchRoute } from "Components/CatchRoute";
import { AdminRoutes } from "Router/AdminRoutes";

export const Catch = {
  path: AdminRoutes.slugRoute(":slug"),
  element: <CatchRoute relative to="/leases" />,
};
