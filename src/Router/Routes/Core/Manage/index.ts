import type { LoaderFunctionArgs, NonIndexRouteObject } from "react-router-dom";
import { LazyManagePage, Loader } from "Pages/Manage/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";
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
  loader: (request: LoaderFunctionArgs) => {
    void Loader(request);
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
