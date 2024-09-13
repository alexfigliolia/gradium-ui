import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const SignUp: NonIndexRouteObject = {
  path: "/register",
  Component: CreateLazyComponent({
    loader: () => import("Pages/SignUp"),
  }),
};