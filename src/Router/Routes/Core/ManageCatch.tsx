import { type NonIndexRouteObject } from "react-router-dom";
import { CatchRoute } from "Components/CatchRoute";

export const ManageCatch: NonIndexRouteObject = {
  path: "app/manage/:slug",
  element: <CatchRoute base="app/manage/:slug" to="/leases" />,
};
