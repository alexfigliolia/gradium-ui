import type { ChangeEvent } from "react";
import { PropertyScopeModel } from "Models/PropertyScopeModel";
import type { ILeases, ILeaseStatus } from "./types";

export class LeasesModel extends PropertyScopeModel<ILeases> {
  public readonly DISPLAY_MAP: Record<ILeaseStatus | "unknown", string> = {
    complete: "Complete",
    "in-progress": "In Progress",
    terminated: "Terminated",
    unknown: "Unknown",
    pending: "Pending",
  };
  public readonly newLease = this.createBasicToggle("newLease");
  public readonly editLease = this.createBasicToggle("editLease");
  public readonly leaseFilters = this.createBasicToggle("leaseFilters");
  constructor() {
    super("Leases", {
      space: "",
      endDate: "",
      startDate: "",
      newLease: false,
      editLease: false,
      leaseFilters: false,
      availableSoon: [],
      availableSpaces: [],
    });
  }

  public initialize() {}

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
}
