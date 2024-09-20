import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Dashboard: NonIndexRouteObject = {
  path: "/app/dashboard/:slug",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Dashboard"),
  }),
};
