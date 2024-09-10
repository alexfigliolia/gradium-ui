import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Login: NonIndexRouteObject = {
  path: "/register/login",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Login"),
  }),
};
