import { redirect } from "react-router-dom";
import { LazyAuthLayout } from "Layouts/Auth/Lazy";
import { Authentication } from "Tools/Authentication";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const Auth = {
  path: "/register",
  Component: LazyAuthLayout,
  loader: async () => {
    if (await Authentication.isAuthenticated()) {
      return redirect("/app");
    }
    return null;
  },
  children: [SignUp, Login],
};
