import { memo } from "react";
import {
  amenitiesAddonInfo,
  PropertyConfiguration,
  usePropertyConfiguration,
} from "Pages/PropertyConfiguration/State";
import type { Propless } from "Types/React";
import { AddonInfoModal } from "../AddonInfoModal";

export const AmenitiesInfoModal = memo(function AmenitiesInfoModal(
  _: Propless,
) {
  const open = usePropertyConfiguration(amenitiesAddonInfo);
  return (
    <AddonInfoModal
      open={open}
      close={PropertyConfiguration.amenitiesAddonInfo.close}>
      <h2>Amenity Reservations</h2>
      <p>
        This addon is for properties with amenities that can be reserved by
        residents.
      </p>
      <p>
        Residents will be able to reserve an amenity space straight from their{" "}
        <span>Resident App</span>.
      </p>
      <p>
        In the <span>Managment App</span>, your staff can configure:
      </p>
      <ul>
        <li>The Property&apos;s amenity spaces</li>
        <li>Each amenity&apos;s hours of operation</li>
        <li>Optional fees resident reservations</li>
      </ul>
      <p>
        Residents will pay their amenity-related dues along with their monthly
        Residential Dues.
      </p>
    </AddonInfoModal>
  );
});
