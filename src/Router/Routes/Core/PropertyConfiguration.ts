import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const PropertyConfiguration: NonIndexRouteObject = {
  path: "/configure/:slug",
  Component: CreateLazyComponent({
    loader: () => import("Pages/PropertyConfiguration"),
  }),
};
