import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const AmenitiesConfiguration: NonIndexRouteObject = {
  path: "/app/configure/:slug/amenities",
  Component: CreateLazyComponent({
    loader: () => import("Pages/AmenitiesConfiguration"),
  }),
};
