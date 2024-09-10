import { subMonths } from "date-fns";
import { State } from "@figliolia/galena";
import type {
  CompletionRatePerStaffMember,
  IDashboard,
  OccupancyPerSpace,
} from "./types";

export class DashboardModel extends State<IDashboard> {
  constructor() {
    super("Dashboard", {
      startDate: "",
      endDate: "",
      occupancy: 100,
      issueCompletion: 63,
      income: DashboardModel.INCOME(),
      expenses: DashboardModel.EXPENSES(),
      inDemandSpaces: DashboardModel.IN_DEMAND_SPACES(),
      completionRatesPerStaffMember:
        DashboardModel.COMPLETION_RATE_PER_STAFF_MEMBER(),
    });
  }

  public resetDates = () => {
    return this.update(state => {
      state.endDate = "";
      state.startDate = "";
    });
  };

  public setStart = (startDate: string) => {
    this.update(state => {
      state.startDate = startDate;
    });
  };

  public setEnd = (endDate: string) => {
    this.update(state => {
      state.endDate = endDate;
    });
  };

  public static INCOME() {
    return Array.from({ length: 12 }, (_, i) => {
      return {
        date: subMonths(new Date(), i),
        value: Math.random() * (100 - 50) + 50,
      };
    }).reverse();
  }

  public static EXPENSES() {
    return Array.from({ length: 12 }, (_, i) => {
      return {
        date: subMonths(new Date(), i),
        value: Math.random() * (30 - 20) + 20,
      };
    }).reverse();
  }

  public static IN_DEMAND_SPACES(): OccupancyPerSpace[] {
    return [
      { name: "202", occupancy: Math.floor(Math.random() * 100) },
      { name: "203", occupancy: Math.floor(Math.random() * 100) },
      { name: "204", occupancy: Math.floor(Math.random() * 100) },
      { name: "205", occupancy: Math.floor(Math.random() * 100) },
      { name: "206", occupancy: Math.floor(Math.random() * 100) },
    ];
  }

  public static COMPLETION_RATE_PER_STAFF_MEMBER(): CompletionRatePerStaffMember[] {
    return [
      { name: "Steve", rate: Math.floor(Math.random() * 100) },
      { name: "George", rate: Math.floor(Math.random() * 100) },
      { name: "Louis", rate: Math.floor(Math.random() * 100) },
      { name: "Erica", rate: Math.floor(Math.random() * 100) },
      { name: "Alex", rate: Math.floor(Math.random() * 100) },
    ];
  }
}
