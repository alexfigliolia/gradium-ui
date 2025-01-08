import { LazyAuthLayout, Loader } from "Layouts/Auth/Lazy";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const Auth = {
  path: "/register",
  Component: LazyAuthLayout,
  loader: () => {
    void Loader();
    return null;
  },
  children: [SignUp, Login],
};
