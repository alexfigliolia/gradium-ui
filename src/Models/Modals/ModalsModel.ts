import { State } from "@figliolia/galena";
import { ModalStack } from "Tools/ModalStack";
import type { IModals } from "./types";

export class ModalsModel extends State<IModals> {
  constructor() {
    super("Modals", {
      newLease: false,
      editLease: false,
      newProperty: false,
      deleteSpace: false,
      leaseFilters: false,
      deleteProperty: false,
      dashboardFilters: false,
    });
  }

  private toggleKey = <K extends keyof IModals>(key: K, nextValue: boolean) => {
    return () => {
      this.update(state => {
        state[key] = nextValue;
      });
    };
  };

  /* TOGGLES */
  private openNewLease = this.toggleKey("newLease", true);
  private closeNewLease = this.toggleKey("newLease", false);
  private openEditLease = this.toggleKey("editLease", true);
  private closeEditLease = this.toggleKey("editLease", false);
  private openNewProperty = this.toggleKey("newProperty", true);
  private closeNewProperty = this.toggleKey("newProperty", false);
  private openDeleteSpace = this.toggleKey("deleteSpace", true);
  private closeDeleteSpace = this.toggleKey("deleteSpace", false);
  private openDeleteProperty = this.toggleKey("deleteProperty", true);
  private closeDeleteProperty = this.toggleKey("deleteProperty", false);
  private openLeaseFilters = this.toggleKey("leaseFilters", true);
  private closeLeaseFilters = this.toggleKey("leaseFilters", false);
  private openDashboardFilters = this.toggleKey("dashboardFilters", true);
  private closeDashboardFilters = this.toggleKey("dashboardFilters", false);

  /* CONTROLLERS */
  newLease = ModalStack.create(this.openNewLease, this.closeNewLease);
  editLease = ModalStack.create(this.openEditLease, this.closeEditLease);
  newProperty = ModalStack.create(this.openNewProperty, this.closeNewProperty);
  deleteSpace = ModalStack.create(this.openDeleteSpace, this.closeDeleteSpace);
  leaseFilters = ModalStack.create(
    this.openLeaseFilters,
    this.closeLeaseFilters,
  );
  dashboardFilters = ModalStack.create(
    this.openDashboardFilters,
    this.closeDashboardFilters,
  );
  deleteProperty = ModalStack.create(
    this.openDeleteProperty,
    this.closeDeleteProperty,
  );
}
