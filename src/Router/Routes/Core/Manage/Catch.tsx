import { type NonIndexRouteObject } from "react-router-dom";
import { CatchRoute } from "Components/CatchRoute";

export const Catch: NonIndexRouteObject = {
  path: "/app/manage/:slug",
  element: <CatchRoute relative to="/leases" />,
};
