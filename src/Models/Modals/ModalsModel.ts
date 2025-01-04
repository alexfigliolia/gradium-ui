import { StackModel } from "Generics/StackModel";
import { ModalStack } from "Tools/ModalStack";
import type { IModals } from "./types";

export class ModalsModel extends StackModel<IModals> {
  constructor() {
    super("Modals", {
      newProperty: false,
      deleteSpace: false,
      forgotPassword: false,
      deleteProperty: false,
      dashboardFilters: false,
      coreMobileMenu: false,
      marketingMobileMenu: false,
    });
  }

  /* TOGGLES */
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
  public readonly forgotPassword = ModalStack.create(
    this.openForgotPassword,
    this.closeForgotPassword,
  );
  public readonly newProperty = ModalStack.create(
    this.openNewProperty,
    this.closeNewProperty,
  );
  public readonly deleteSpace = ModalStack.create(
    this.openDeleteSpace,
    this.closeDeleteSpace,
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
