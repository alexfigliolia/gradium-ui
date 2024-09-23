import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Leases: NonIndexRouteObject = {
  path: "/app/manage/:slug/leases",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Leases"),
  }),
};