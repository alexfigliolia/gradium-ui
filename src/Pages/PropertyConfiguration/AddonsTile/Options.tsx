import { PropertyAddonType } from "GraphQL/Types";
import { PropertyConfiguration } from "Pages/PropertyConfiguration/State";
import { InfoLabel } from "./InfoLabel";

export const OPTIONS = [
  {
    value: PropertyAddonType.LeaseManagement,
    label: (
      <InfoLabel
        label="Lease Management"
        modal={PropertyConfiguration.leaseAddonInfo}
      />
    ),
  },
  {
    value: PropertyAddonType.AmenityReservations,
    label: (
      <InfoLabel
        label="Amenity Reservations"
        modal={PropertyConfiguration.amenitiesAddonInfo}
      />
    ),
  },
  {
    value: PropertyAddonType.PackageManagement,
    label: (
      <InfoLabel
        label="Package Management"
        modal={PropertyConfiguration.packageAddonInfo}
      />
    ),
  },
  {
    value: PropertyAddonType.PropertyEvents,
    label: (
      <InfoLabel
        label="Events at your Property"
        modal={PropertyConfiguration.eventAddonInfo}
      />
    ),
  },
  {
    value: PropertyAddonType.HoaManagement,
    label: (
      <InfoLabel
        label="HOA Management"
        modal={PropertyConfiguration.hoaAddonInfo}
      />
    ),
  },
];
