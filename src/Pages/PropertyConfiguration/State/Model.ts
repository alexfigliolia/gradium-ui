import { StackModel } from "Generics/StackModel";

export class PropertyConfigurationModel extends StackModel<IPCM> {
  private openHOAAddonInfo = this.toggleKey("hoaAddonInfo", true);
  private closeHOAAddonInfo = this.toggleKey("hoaAddonInfo", false);
  private openEventAddonInfo = this.toggleKey("eventAddonInfo", true);
  private closeEventAddonInfo = this.toggleKey("eventAddonInfo", false);
  private openLeaseAddonInfo = this.toggleKey("leaseAddonInfo", true);
  private closeLeaseAddonInfo = this.toggleKey("leaseAddonInfo", false);
  private openPackageAddonInfo = this.toggleKey("packageAddonInfo", true);
  private closePackageAddonInfo = this.toggleKey("packageAddonInfo", false);
  private openAmenitiesAddonInfo = this.toggleKey("amenitiesAddonInfo", true);
  private closeAmenitiesAddonInfo = this.toggleKey("amenitiesAddonInfo", false);
  constructor() {
    super("Property Configuration", {
      hoaAddonInfo: false,
      eventAddonInfo: false,
      leaseAddonInfo: false,
      packageAddonInfo: false,
      amenitiesAddonInfo: false,
      marketingMobileMenu: false,
    });
  }

  hoaAddonInfo = this.createToggle(
    this.openHOAAddonInfo,
    this.closeHOAAddonInfo,
  );
  eventAddonInfo = this.createToggle(
    this.openEventAddonInfo,
    this.closeEventAddonInfo,
  );
  leaseAddonInfo = this.createToggle(
    this.openLeaseAddonInfo,
    this.closeLeaseAddonInfo,
  );
  packageAddonInfo = this.createToggle(
    this.openPackageAddonInfo,
    this.closePackageAddonInfo,
  );
  amenitiesAddonInfo = this.createToggle(
    this.openAmenitiesAddonInfo,
    this.closeAmenitiesAddonInfo,
  );
}

export interface IPCM {
  hoaAddonInfo: boolean;
  eventAddonInfo: boolean;
  leaseAddonInfo: boolean;
  packageAddonInfo: boolean;
  amenitiesAddonInfo: boolean;
  marketingMobileMenu: boolean;
}
