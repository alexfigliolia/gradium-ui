import { BuildingsFilled, BuildingsStroked } from "Icons/Buildings";
import { ScheduleFilled, ScheduleStroked } from "Icons/Schedule";
import { SettingsFilled, SettingsStroked } from "Icons/Settings";
import { StaffFilled, StaffStroked } from "Icons/Staff";
import type { RouteConfig } from "./types";

export class AdminRoutes {
  public static readonly PROPERTIES: RouteConfig = {
    label: "Properties",
    path: "/properties",
    FilledIcon: BuildingsFilled,
    StrokedIcon: BuildingsStroked,
    matcher: path => {
      return (
        path.startsWith("/properties") ||
        path.startsWith("/configure") ||
        path.startsWith("/dashboard") ||
        path.startsWith("/manage")
      );
    },
  };
  public static readonly STAFF: RouteConfig = {
    path: "/staff",
    label: "Staff",
    FilledIcon: StaffFilled,
    StrokedIcon: StaffStroked,
  };
  public static readonly SCHEDULE: RouteConfig = {
    path: "/schedule",
    label: "Schedule",
    FilledIcon: ScheduleFilled,
    StrokedIcon: ScheduleStroked,
  };
  public static readonly SETTINGS: RouteConfig = {
    path: "/settings",
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
