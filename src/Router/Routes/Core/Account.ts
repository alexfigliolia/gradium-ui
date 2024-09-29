import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const Account: NonIndexRouteObject = {
  path: "/app/account",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Account"),
  }),
};
