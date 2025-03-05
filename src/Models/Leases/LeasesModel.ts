import type { ChangeEvent } from "react";
import { PropertyScopeModel } from "Models/PropertyScopeModel";
import type { ILeases } from "./types";

export class LeasesModel extends PropertyScopeModel<ILeases> {
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
      scopedUnit: -1,
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

  private readonly openNewLease = (unit = -1) => {
    this.update(state => {
      state.scopedUnit = unit;
      state.newLease = true;
    });
  };

  private readonly closeNewLease = () => {
    this.update(state => {
      state.scopedUnit = -1;
      state.newLease = false;
    });
  };

  public readonly newLease = this.createToggle(
    this.openNewLease,
    this.closeNewLease,
  );
  public readonly editLease = this.createBasicToggle("editLease");
  public readonly leaseFilters = this.createBasicToggle("leaseFilters");
}
