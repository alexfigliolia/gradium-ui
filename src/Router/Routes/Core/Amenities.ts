import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Amenities: NonIndexRouteObject = {
  path: "app/manage/:slug/amenities",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Amenities"),
  }),
};
