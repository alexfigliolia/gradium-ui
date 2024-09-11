import { addYears, subYears } from "date-fns";
import type { ChangeEvent } from "react";
import { State } from "@figliolia/galena";
import type { IUnitType } from "Models/LivingSpaces";
import type { ILease, ILeases, ILeaseStatus } from "./types";

export class LeasesModel extends State<ILeases> {
  public DISPLAY_MAP: Record<ILeaseStatus | "unknown", string> = {
    complete: "Complete",
    "in-progress": "In Progress",
    terminated: "Terminated",
    unknown: "Unknown",
    pending: "Pending",
  };

  constructor() {
    super("Leases", {
      page: 1,
      space: "",
      endDate: "",
      startDate: "",
      maxPage: 10,
      leases: LeasesModel.LEASES,
    });
  }

  public previous = () => {
    this.update(state => {
      state.page = Math.max(1, state.page - 1);
    });
  };

  public next = () => {
    this.update(state => {
      state.page = Math.min(state.maxPage, state.page + 1);
    });
  };

  public searchSpace = (e: ChangeEvent<HTMLInputElement>) => {
    this.update(state => {
      state.space = e.target.value;
    });
  };

  public setStartDate = (value: string) => {
    this.update(state => {
      state.startDate = value;
    });
  };

  public setEndDate = (value: string) => {
    this.update(state => {
      state.endDate = value;
    });
  };

  public resetFilters = () => {
    this.update(state => {
      state.space = "";
      state.endDate = "";
      state.startDate = "";
    });
  };

  public get emptyLease(): ILease {
    return {
      id: -1,
      space: {
        name: "",
        type: "" as IUnitType,
      },
      end: "",
      start: "",
      rate: 0,
      status: "" as ILeaseStatus,
      lessees: [],
    };
  }

  public static readonly LEASES: ILease[] = [
    {
      id: 0,
      space: {
        name: "201",
        type: "unit",
      },
      end: addYears(new Date(), 0.5).toISOString(),
      start: addYears(new Date(), 1.5).toISOString(),
      rate: 24000,
      status: "pending",
      lessees: [],
    },
    {
      id: 1,
      space: {
        name: "202",
        type: "unit",
      },
      end: addYears(new Date(), 0.5).toISOString(),
      start: subYears(new Date(), 0.5).toISOString(),
      rate: 24000,
      status: "in-progress",
      lessees: [],
    },
    {
      id: 2,
      space: {
        name: "203",
        type: "unit",
      },
      end: addYears(new Date(), 0.4).toISOString(),
      start: subYears(new Date(), 0.6).toISOString(),
      rate: 24000,
      status: "complete",
      lessees: [],
    },
    {
      id: 3,
      space: {
        name: "204",
        type: "unit",
      },
      end: addYears(new Date(), 0.3).toISOString(),
      start: subYears(new Date(), 0.7).toISOString(),
      rate: 24000,
      status: "terminated",
      lessees: [],
    },
    {
      id: 4,
      space: {
        name: "205",
        type: "unit",
      },
      end: addYears(new Date(), 0.7).toISOString(),
      start: subYears(new Date(), 0.3).toISOString(),
      rate: 24000,
      status: "in-progress",
      lessees: [],
    },
  ];
}
