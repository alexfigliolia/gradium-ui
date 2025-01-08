import { Authentication } from "Tools/Authentication";
import { GradiumRedirect } from "Tools/GradiumRedirect";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async () => {
  if (await Authentication.isAuthenticated()) {
    GradiumRedirect.dispatch("/app");
  }
};

export const LazyAuthLayout = CreateLazyComponent({
  loader: () => import("./index"),
});
