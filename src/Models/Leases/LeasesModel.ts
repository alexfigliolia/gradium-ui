import { addYears, subYears } from "date-fns";
import type { ChangeEvent } from "react";
import { LivingSpaceType } from "GraphQL/Types";
import { PropertyScopeModel } from "Models/PropertyScopeModel";
import type { ILease, ILeases, ILeaseStatus } from "./types";

export class LeasesModel extends PropertyScopeModel<ILeases> {
  public readonly DISPLAY_MAP: Record<ILeaseStatus | "unknown", string> = {
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
      newLease: false,
      editLease: false,
      leaseFilters: false,
      leases: LeasesModel.LEASES,
    });
  }

  public readonly previous = () => {
    this.update(state => {
      state.page = Math.max(1, state.page - 1);
    });
  };

  public readonly next = () => {
    this.update(state => {
      state.page = Math.min(state.maxPage, state.page + 1);
    });
  };

  public readonly searchSpace = (e: ChangeEvent<HTMLInputElement>) => {
    this.update(state => {
      state.space = e.target.value;
    });
  };

  public readonly setStartDate = (value: string) => {
    this.update(state => {
      state.startDate = value;
    });
  };

  public readonly setEndDate = (value: string) => {
    this.update(state => {
      state.endDate = value;
    });
  };

  public readonly resetFilters = () => {
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
        type: "" as LivingSpaceType,
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
        type: LivingSpaceType.Unit,
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
        type: LivingSpaceType.Unit,
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
        type: LivingSpaceType.Unit,
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
        type: LivingSpaceType.Unit,
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
        type: LivingSpaceType.Unit,
      },
      end: addYears(new Date(), 0.7).toISOString(),
      start: subYears(new Date(), 0.3).toISOString(),
      rate: 24000,
      status: "in-progress",
      lessees: [],
    },
  ];

  private readonly openNewLease = this.toggleKey("newLease", true);
  private readonly closeNewLease = this.toggleKey("newLease", false);
  private readonly openEditLease = this.toggleKey("editLease", true);
  private readonly closeEditLease = this.toggleKey("editLease", false);
  private readonly openLeaseFilters = this.toggleKey("leaseFilters", true);
  private readonly closeLeaseFilters = this.toggleKey("leaseFilters", false);

  public readonly newLease = this.createToggle(
    this.openNewLease,
    this.closeNewLease,
  );
  public readonly editLease = this.createToggle(
    this.openEditLease,
    this.closeEditLease,
  );
  public readonly leaseFilters = this.createToggle(
    this.openLeaseFilters,
    this.closeLeaseFilters,
  );
}
