import { redirect } from "react-router-dom";
import { Authentication } from "Tools/Authentication";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async () => {
  if (await Authentication.isAuthenticated()) {
    throw redirect("/app");
  }
};

export const LazyAuthLayout = CreateLazyComponent({
  loader: () => import("./index"),
});
