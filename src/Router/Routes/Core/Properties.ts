import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Properties: NonIndexRouteObject = {
  path: "/app/properties",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Properties"),
  }),
};
