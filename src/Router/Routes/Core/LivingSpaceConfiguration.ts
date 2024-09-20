import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const LivingSpaceConfiguration: NonIndexRouteObject = {
  path: "/app/configure/:slug/living-spaces",
  Component: CreateLazyComponent({
    loader: () => import("Pages/LivingSpaceConfiguration"),
  }),
};
