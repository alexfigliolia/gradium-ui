import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "LazyLoading";

export const Home: NonIndexRouteObject = {
  path: "/",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Home"),
  }),
};
