import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const Auth: NonIndexRouteObject = {
  path: "/register",
  Component: CreateLazyComponent({
    loader: () => import("Layouts/Auth"),
  }),
  children: [SignUp, Login],
};
