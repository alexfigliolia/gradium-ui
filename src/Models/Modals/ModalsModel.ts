import { StackModel } from "Generics/StackModel";
import { ModalStack } from "Tools/ModalStack";
import type { IModals } from "./types";

export class ModalsModel extends StackModel<IModals> {
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
      forgotPassword: false,
      leaseFilters: false,
      deleteProperty: false,
      dashboardFilters: false,
      coreMobileMenu: false,
      marketingMobileMenu: false,
    });
  }

  private readonly openDeleteEmail = (email: string) => {
    this.update(state => {
      state.emailToDelete = email;
      state.deleteEmail = true;
    });
  };

  private readonly closeDeleteEmail = () => {
    this.update(state => {
      state.emailToDelete = "";
      state.deleteEmail = false;
    });
  };

  /* TOGGLES */
  private readonly openLinkEmail = this.toggleKey("linkEmail", true);
  private readonly closeLinkEmail = this.toggleKey("linkEmail", false);
  private readonly openEmailInfo = this.toggleKey("emailInfo", true);
  private readonly closeEmailInfo = this.toggleKey("emailInfo", false);
  private readonly openResetPassword = this.toggleKey("resetPassword", true);
  private readonly closeResetPassword = this.toggleKey("resetPassword", false);
  private readonly openNewLease = this.toggleKey("newLease", true);
  private readonly closeNewLease = this.toggleKey("newLease", false);
  private readonly openEditLease = this.toggleKey("editLease", true);
  private readonly closeEditLease = this.toggleKey("editLease", false);
  private readonly openNewProperty = this.toggleKey("newProperty", true);
  private readonly closeNewProperty = this.toggleKey("newProperty", false);
  private readonly openDeleteSpace = this.toggleKey("deleteSpace", true);
  private readonly closeDeleteSpace = this.toggleKey("deleteSpace", false);
  private readonly openForgotPassword = this.toggleKey("forgotPassword", true);
  private readonly closeForgotPassword = this.toggleKey(
    "forgotPassword",
    false,
  );
  private readonly openCoreMobileMenu = this.toggleKey("coreMobileMenu", true);
  private readonly closeCoreMobileMenu = this.toggleKey(
    "coreMobileMenu",
    false,
  );
  private readonly openMobileMenu = this.toggleKey("marketingMobileMenu", true);
  private readonly closeMobileMenu = this.toggleKey(
    "marketingMobileMenu",
    false,
  );
  private readonly openDeleteProperty = this.toggleKey("deleteProperty", true);
  private readonly closeDeleteProperty = this.toggleKey(
    "deleteProperty",
    false,
  );
  private readonly openLeaseFilters = this.toggleKey("leaseFilters", true);
  private readonly closeLeaseFilters = this.toggleKey("leaseFilters", false);
  private readonly openDashboardFilters = this.toggleKey(
    "dashboardFilters",
    true,
  );
  private readonly closeDashboardFilters = this.toggleKey(
    "dashboardFilters",
    false,
  );

  /* CONTROLLERS */
  public readonly marketingMobileMenu = ModalStack.create(
    this.openMobileMenu,
    this.closeMobileMenu,
  );
  public readonly coreMobileMenu = ModalStack.create(
    this.openCoreMobileMenu,
    this.closeCoreMobileMenu,
  );
  public readonly linkEmail = ModalStack.create(
    this.openLinkEmail,
    this.closeLinkEmail,
  );
  public readonly emailInfo = ModalStack.create(
    this.openEmailInfo,
    this.closeEmailInfo,
  );
  public readonly resetPassword = ModalStack.create(
    this.openResetPassword,
    this.closeResetPassword,
  );
  public readonly deleteEmail = ModalStack.create(
    this.openDeleteEmail,
    this.closeDeleteEmail,
  );
  public readonly forgotPassword = ModalStack.create(
    this.openForgotPassword,
    this.closeForgotPassword,
  );
  public readonly newLease = ModalStack.create(
    this.openNewLease,
    this.closeNewLease,
  );
  public readonly editLease = ModalStack.create(
    this.openEditLease,
    this.closeEditLease,
  );
  public readonly newProperty = ModalStack.create(
    this.openNewProperty,
    this.closeNewProperty,
  );
  public readonly deleteSpace = ModalStack.create(
    this.openDeleteSpace,
    this.closeDeleteSpace,
  );
  public readonly leaseFilters = ModalStack.create(
    this.openLeaseFilters,
    this.closeLeaseFilters,
  );
  public readonly dashboardFilters = ModalStack.create(
    this.openDashboardFilters,
    this.closeDashboardFilters,
  );
  public readonly deleteProperty = ModalStack.create(
    this.openDeleteProperty,
    this.closeDeleteProperty,
  );
}
