import { LazyManagePage } from "Pages/Manage/Lazy";
import { AdminRoutes } from "Router/AdminRoutes";
import { Amenities } from "./Amenities";
import { AmenitiesConfiguration } from "./AmenitiesConfiguration";
import { Catch } from "./Catch";
import { Leases } from "./Leases";
import { LivingSpaceConfiguration } from "./LivingSpaceConfiguration";
import { PropertyConfiguration } from "./PropertyConfiguration";

export const Manage = {
  path: AdminRoutes.slugRoute(":slug"),
  Component: LazyManagePage,
  children: [
    Leases,
    Amenities,
    PropertyConfiguration,
    AmenitiesConfiguration,
    LivingSpaceConfiguration,
    Catch,
  ],
};
