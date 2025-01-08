import { type LoaderFunctionArgs, redirect } from "react-router-dom";
import { Properties } from "State/Properties";
import { AppLoaders } from "Tools/AppLoaders";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug = "" } = params;
  if (!slug) {
    throw redirect("/app/properties");
  }
  await AppLoaders.Properties.get();
  Properties.setActiveProperty(slug);
};

export const LazyManagePage = CreateLazyComponent({
  loader: () => import("./index"),
});
