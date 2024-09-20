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
      dateSelector: false,
      leaseFilters: false,
      deleteProperty: false,
      dashboardFilters: false,
      coreMobileMenu: false,
      marketingMobileMenu: false,
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
  private openCoreMobileMenu = this.toggleKey("coreMobileMenu", true);
  private closeCoreMobileMenu = this.toggleKey("coreMobileMenu", false);
  private openMobileMenu = this.toggleKey("marketingMobileMenu", true);
  private closeMobileMenu = this.toggleKey("marketingMobileMenu", false);
  private openDateSelector = this.toggleKey("dateSelector", true);
  private closeDateSelector = this.toggleKey("dateSelector", false);
  private openDeleteProperty = this.toggleKey("deleteProperty", true);
  private closeDeleteProperty = this.toggleKey("deleteProperty", false);
  private openLeaseFilters = this.toggleKey("leaseFilters", true);
  private closeLeaseFilters = this.toggleKey("leaseFilters", false);
  private openDashboardFilters = this.toggleKey("dashboardFilters", true);
  private closeDashboardFilters = this.toggleKey("dashboardFilters", false);

  /* CONTROLLERS */
  newLease = ModalStack.create(this.openNewLease, this.closeNewLease);
  editLease = ModalStack.create(this.openEditLease, this.closeEditLease);
  marketingMobileMenu = ModalStack.create(
    this.openMobileMenu,
    this.closeMobileMenu,
  );
  coreMobileMenu = ModalStack.create(
    this.openCoreMobileMenu,
    this.closeCoreMobileMenu,
  );
  newProperty = ModalStack.create(this.openNewProperty, this.closeNewProperty);
  deleteSpace = ModalStack.create(this.openDeleteSpace, this.closeDeleteSpace);
  leaseFilters = ModalStack.create(
    this.openLeaseFilters,
    this.closeLeaseFilters,
  );
  dateSelector = ModalStack.create(
    this.openDateSelector,
    this.closeDateSelector,
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
