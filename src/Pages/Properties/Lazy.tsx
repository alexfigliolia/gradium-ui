import { PageLoader } from "Components/PageLoader";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyPropertiesPage = CreateLazyComponent({
  loader: () => import("./index"),
  fallback: <PageLoader label="Your Properties" />,
});
