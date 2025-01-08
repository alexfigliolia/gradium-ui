import { type LoaderFunctionArgs } from "react-router-dom";
import { Properties } from "State/Properties";
import { AppLoaders } from "Tools/AppLoaders";
import { GradiumRedirect } from "Tools/GradiumRedirect";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug = "" } = params;
  if (!slug) {
    return GradiumRedirect.dispatch("/app/properties");
  }
  await AppLoaders.Properties.get();
  try {
    Properties.setActiveProperty(slug);
  } catch (error) {
    GradiumRedirect.dispatch("/app/properties");
  }
};

export const LazyManagePage = CreateLazyComponent({
  loader: () => import("./index"),
});
