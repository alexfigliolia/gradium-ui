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

  private readonly openHOAAddonInfo = this.toggleKey("hoaAddonInfo", true);
  private readonly closeHOAAddonInfo = this.toggleKey("hoaAddonInfo", false);
  private readonly openEventAddonInfo = this.toggleKey("eventAddonInfo", true);
  private readonly closeEventAddonInfo = this.toggleKey(
    "eventAddonInfo",
    false,
  );
  private readonly openLeaseAddonInfo = this.toggleKey("leaseAddonInfo", true);
  private readonly closeLeaseAddonInfo = this.toggleKey(
    "leaseAddonInfo",
    false,
  );
  private readonly openPackageAddonInfo = this.toggleKey(
    "packageAddonInfo",
    true,
  );
  private readonly closePackageAddonInfo = this.toggleKey(
    "packageAddonInfo",
    false,
  );
  private readonly openAmenitiesAddonInfo = this.toggleKey(
    "amenitiesAddonInfo",
    true,
  );
  private readonly closeAmenitiesAddonInfo = this.toggleKey(
    "amenitiesAddonInfo",
    false,
  );

  public readonly hoaAddonInfo = this.createToggle(
    this.openHOAAddonInfo,
    this.closeHOAAddonInfo,
  );
  public readonly eventAddonInfo = this.createToggle(
    this.openEventAddonInfo,
    this.closeEventAddonInfo,
  );
  public readonly leaseAddonInfo = this.createToggle(
    this.openLeaseAddonInfo,
    this.closeLeaseAddonInfo,
  );
  public readonly packageAddonInfo = this.createToggle(
    this.openPackageAddonInfo,
    this.closePackageAddonInfo,
  );
  public readonly amenitiesAddonInfo = this.createToggle(
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
