import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";
import { Amenities } from "./Amenities";
import { Catch } from "./Catch";
import { Leases } from "./Leases";

export const Manage: NonIndexRouteObject = {
  path: "/app/manage/:slug",
  Component: CreateLazyComponent({
    loader: () => import("Pages/Manage"),
  }),
  children: [Leases, Amenities, Catch],
};
