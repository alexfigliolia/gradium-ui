import type { LoaderFunctionArgs, NonIndexRouteObject } from "react-router-dom";
import { redirect } from "react-router-dom";
import { LazyManagePage } from "Pages/Manage/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";
import { Properties } from "State/Properties";
import { AppLoaders } from "Tools/AppLoaders";
import { AmenitiesConfiguration } from "./AmenitiesConfiguration";
import { AmenityReservations } from "./AmenityReservations";
import { Catch } from "./Catch";
import { Leases } from "./Leases";
import { LivingSpaceConfiguration } from "./LivingSpaceConfiguration";
import { PropertyConfiguration } from "./PropertyConfiguration";
import { PropertyMaintenance } from "./PropertyMaintenance";

export const Manage: NonIndexRouteObject = {
  path: AdminRoutes.slugRoute(":slug"),
  Component: LazyManagePage,
  loader: async ({ params }: LoaderFunctionArgs) => {
    const { slug = "" } = params;
    if (!slug) {
      throw redirect("/app/properties");
    }
    await AppLoaders.Properties.get();
    Properties.setActiveProperty(slug);
    return null;
  },
  children: [
    Leases,
    PropertyMaintenance,
    AmenityReservations,
    PropertyConfiguration,
    AmenitiesConfiguration,
    LivingSpaceConfiguration,
    Catch,
  ],
};
