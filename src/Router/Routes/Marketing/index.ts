import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Marketing: NonIndexRouteObject = {
  path: "/",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Marketing"),
  }),
};
