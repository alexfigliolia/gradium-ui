import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const PropertyConfiguration: NonIndexRouteObject = {
  path: "/app/configure/:slug",
  Component: CreateLazyComponent({
    loader: () => import("Pages/PropertyConfiguration"),
  }),
};
