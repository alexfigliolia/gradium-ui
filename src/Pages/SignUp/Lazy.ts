import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazySignUpPage = CreateLazyComponent({
  loader: () => import("./index"),
});
