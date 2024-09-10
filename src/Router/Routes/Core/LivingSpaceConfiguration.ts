import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const LivingSpaceConfiguration: NonIndexRouteObject = {
  path: "/configure/:slug/living-spaces",
  Component: CreateLazyComponent({
    loader: () => import("Pages/LivingSpaceConfiguration"),
  }),
};
