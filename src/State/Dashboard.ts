import { createUseState } from "@figliolia/react-galena";
import type {
  CompletionRatePerStaffMember,
  IDashboard,
  OccupancyPerSpace,
} from "Models/Dashboard";
import { DashboardModel } from "Models/Dashboard";

export const Dashboard = new DashboardModel();
export const useDashboard = createUseState(Dashboard);
export const selectFinancials = (state: IDashboard) => [
  state.income,
  state.expenses,
];
export const selectDateRange = (state: IDashboard) => [
  state.startDate,
  state.endDate,
];
export const selectOccupancy = (
  state: IDashboard,
): [number, OccupancyPerSpace[]] => [state.occupancy, state.inDemandSpaces];

export const selectMaintenance = (
  state: IDashboard,
): [number, CompletionRatePerStaffMember[]] => [
  state.issueCompletion,
  state.completionRatesPerStaffMember,
];
