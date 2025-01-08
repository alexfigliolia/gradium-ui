import { StackModel } from "Generics/StackModel";
import { ModalStack } from "Tools/ModalStack";
import type { IModals } from "./types";

export class ModalsModel extends StackModel<IModals> {
  constructor() {
    super("Modals", {
      deleteSpace: false,
      deleteProperty: false,
      dashboardFilters: false,
    });
  }

  /* TOGGLES */
  private readonly openDeleteSpace = this.toggleKey("deleteSpace", true);
  private readonly closeDeleteSpace = this.toggleKey("deleteSpace", false);
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
