import { LazyManagePage } from "Pages/Manage/Lazy";
import { Amenities } from "./Amenities";
import { Catch } from "./Catch";
import { Leases } from "./Leases";

export const Manage = {
  path: "/app/manage/:slug",
  Component: LazyManagePage,
  children: [Leases, Amenities, Catch],
};
