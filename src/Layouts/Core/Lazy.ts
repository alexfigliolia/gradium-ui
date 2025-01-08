import { redirect } from "react-router-dom";
import { BaseModel } from "Models/BaseModel";
import { AppLoaders } from "Tools/AppLoaders";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async () => {
  try {
    if (!(await AppLoaders.Auth.get())) {
      throw "redirect";
    }
    void AppLoaders.Properties.get();
  } catch (error) {
    AppLoaders.resetAll();
    BaseModel.resetAll();
    throw redirect("/register/login");
  }
};

export const LazyCoreLayout = CreateLazyComponent({
  loader: () => import("./index"),
});
