import { BaseModel } from "Models/BaseModel";
import { ModalStack } from "Tools/ModalStack";
import type { FilterKeys } from "Types/Generics";
import type { IModals } from "./types";

export class ModalsModel extends BaseModel<IModals> {
  constructor() {
    super("Modals", {
      emailInfo: false,
      deleteEmail: false,
      linkEmail: false,
      newLease: false,
      emailToDelete: "",
      editLease: false,
      newProperty: false,
      resetPassword: false,
      deleteSpace: false,
      dateSelector: false,
      forgotPassword: false,
      leaseFilters: false,
      deleteProperty: false,
      dashboardFilters: false,
      coreMobileMenu: false,
      marketingMobileMenu: false,
    });
  }

  private toggleKey = <K extends keyof FilterKeys<IModals, boolean>>(
    key: K,
    nextValue: boolean,
  ) => {
    return () => {
      this.update(state => {
        // @ts-ignore
        state[key] = nextValue;
      });
    };
  };

  private openDeleteEmail = (email: string) => {
    this.update(state => {
      state.emailToDelete = email;
      state.deleteEmail = true;
    });
  };

  private closeDeleteEmail = () => {
    this.update(state => {
      state.emailToDelete = "";
      state.deleteEmail = false;
    });
  };

  /* TOGGLES */
  private openLinkEmail = this.toggleKey("linkEmail", true);
  private closeLinkEmail = this.toggleKey("linkEmail", false);
  private openEmailInfo = this.toggleKey("emailInfo", true);
  private closeEmailInfo = this.toggleKey("emailInfo", false);
  private openResetPassword = this.toggleKey("resetPassword", true);
  private closeResetPassword = this.toggleKey("resetPassword", false);
  private openNewLease = this.toggleKey("newLease", true);
  private closeNewLease = this.toggleKey("newLease", false);
  private openEditLease = this.toggleKey("editLease", true);
  private closeEditLease = this.toggleKey("editLease", false);
  private openNewProperty = this.toggleKey("newProperty", true);
  private closeNewProperty = this.toggleKey("newProperty", false);
  private openDeleteSpace = this.toggleKey("deleteSpace", true);
  private closeDeleteSpace = this.toggleKey("deleteSpace", false);
  private openForgotPassword = this.toggleKey("forgotPassword", true);
  private closeForgotPassword = this.toggleKey("forgotPassword", false);
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
  marketingMobileMenu = ModalStack.create(
    this.openMobileMenu,
    this.closeMobileMenu,
  );
  coreMobileMenu = ModalStack.create(
    this.openCoreMobileMenu,
    this.closeCoreMobileMenu,
  );
  linkEmail = ModalStack.create(this.openLinkEmail, this.closeLinkEmail);
  emailInfo = ModalStack.create(this.openEmailInfo, this.closeEmailInfo);
  resetPassword = ModalStack.create(
    this.openResetPassword,
    this.closeResetPassword,
  );
  deleteEmail = ModalStack.create(this.openDeleteEmail, this.closeDeleteEmail);
  forgotPassword = ModalStack.create(
    this.openForgotPassword,
    this.closeForgotPassword,
  );
  newLease = ModalStack.create(this.openNewLease, this.closeNewLease);
  editLease = ModalStack.create(this.openEditLease, this.closeEditLease);
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
