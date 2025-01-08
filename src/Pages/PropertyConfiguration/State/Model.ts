import { StackModel } from "Generics/StackModel";

export class PropertyConfigurationModel extends StackModel<IPCM> {
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

  public readonly hoaAddonInfo = this.createBasicToggle("hoaAddonInfo");
  public readonly eventAddonInfo = this.createBasicToggle("eventAddonInfo");
  public readonly leaseAddonInfo = this.createBasicToggle("leaseAddonInfo");
  public readonly packageAddonInfo = this.createBasicToggle("packageAddonInfo");
  public readonly amenitiesAddonInfo =
    this.createBasicToggle("amenitiesAddonInfo");
}

export interface IPCM {
  hoaAddonInfo: boolean;
  eventAddonInfo: boolean;
  leaseAddonInfo: boolean;
  packageAddonInfo: boolean;
  amenitiesAddonInfo: boolean;
  marketingMobileMenu: boolean;
}
