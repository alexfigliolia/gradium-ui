import { type NonIndexRouteObject, redirect } from "react-router-dom";
import { Authentication } from "Tools/Authentication";
import { CreateLazyComponent } from "Tools/LazyLoading";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const Auth: NonIndexRouteObject = {
  path: "/register",
  Component: CreateLazyComponent({
    loader: () => import("Layouts/Auth"),
  }),
  loader: async () => {
    if (await Authentication.isAuthenticated()) {
      return redirect("/app");
    }
    return null;
  },
  children: [SignUp, Login],
};
