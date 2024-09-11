import { type NonIndexRouteObject } from "react-router-dom";
import { CatchRoute } from "Components/CatchRoute";

export const ManageCatch: NonIndexRouteObject = {
  path: "/manage/:slug",
  element: <CatchRoute base="/manage/:slug" to="/leases" />,
};
