import type { NonIndexRouteObject } from "react-router-dom";
import { CreateLazyComponent } from "Tools/LazyLoading";
import { AmenitiesConfiguration } from "./AmenitiesConfiguration";
import { Dashboard } from "./Dashboard";
import { Home } from "./Home";
import { LivingSpaceConfiguration } from "./LivingSpaceConfiguration";
import { Manage } from "./Manage";
import { Properties } from "./Properties";
import { PropertyConfiguration } from "./PropertyConfiguration";

export const Core: NonIndexRouteObject = {
  path: "/app",
  Component: CreateLazyComponent({
    loader: () => import("Layouts/Core"),
  }),
  children: [
    Home,
    Manage,
    Dashboard,
    Properties,
    PropertyConfiguration,
    AmenitiesConfiguration,
    LivingSpaceConfiguration,
  ],
};
