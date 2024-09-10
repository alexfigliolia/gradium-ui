import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Manage: NonIndexRouteObject = {
  path: "/manage/:slug",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Manage"),
  }),
};
