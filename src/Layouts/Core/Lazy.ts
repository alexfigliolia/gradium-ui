import { AppLoaders } from "Tools/AppLoaders";
import { GradiumRedirect } from "Tools/GradiumRedirect";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async () => {
  try {
    if (!(await AppLoaders.Auth.get())) {
      throw "redirect";
    }
    void AppLoaders.Properties.get();
  } catch (error) {
    GradiumRedirect.dispatch("/register/login");
  }
};

export const LazyCoreLayout = CreateLazyComponent({
  loader: () => import("./index"),
});
