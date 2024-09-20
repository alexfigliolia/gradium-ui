import { BuildingsFilled, BuildingsStroked } from "Icons/Buildings";
import { ScheduleFilled, ScheduleStroked } from "Icons/Schedule";
import { SettingsFilled, SettingsStroked } from "Icons/Settings";
import { StaffFilled, StaffStroked } from "Icons/Staff";
import type { RouteConfig } from "./types";

export class AdminRoutes {
  public static readonly PROPERTIES: RouteConfig = {
    label: "Properties",
    path: "/app/properties",
    FilledIcon: BuildingsFilled,
    StrokedIcon: BuildingsStroked,
    matcher: path => {
      return (
        path.startsWith("/app/properties") ||
        path.startsWith("/app/configure") ||
        path.startsWith("/app/dashboard") ||
        path.startsWith("/app/manage")
      );
    },
  };
  public static readonly STAFF: RouteConfig = {
    path: "/app/staff",
    label: "Staff",
    FilledIcon: StaffFilled,
    StrokedIcon: StaffStroked,
  };
  public static readonly SCHEDULE: RouteConfig = {
    path: "/app/schedule",
    label: "Schedule",
    FilledIcon: ScheduleFilled,
    StrokedIcon: ScheduleStroked,
  };
  public static readonly SETTINGS: RouteConfig = {
    path: "/app/settings",
    label: "Settings",
    FilledIcon: SettingsFilled,
    StrokedIcon: SettingsStroked,
  };

  public static readonly navigationRoutes = [
    this.PROPERTIES,
    this.STAFF,
    this.SCHEDULE,
    this.SETTINGS,
  ];
}
