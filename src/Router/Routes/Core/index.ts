import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "LazyLoading";
import { Home } from "./Home";
import { Properties } from "./Properties";

export const Core: NonIndexRouteObject = {
  path: "/",
  Component: CreateLazyComponent({
    loader: () => import("Layouts/Core"),
  }),
  children: [Home, Properties],
};
