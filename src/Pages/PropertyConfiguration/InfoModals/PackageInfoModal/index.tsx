import { memo } from "react";
import {
  packageAddonInfo,
  PropertyConfiguration,
  usePropertyConfiguration,
} from "Pages/PropertyConfiguration/State";
import type { Propless } from "Types/React";
import { AddonInfoModal } from "../AddonInfoModal";

export const PackageInfoModal = memo(function PackageInfoModal(_: Propless) {
  const open = usePropertyConfiguration(packageAddonInfo);
  return (
    <AddonInfoModal
      open={open}
      close={PropertyConfiguration.packageAddonInfo.close}>
      <h2>Package Handling</h2>
      <p>
        This addon is for properties that take in packages on behalf of
        residents.
      </p>
      <p>
        By selecting this addon, your staff can log incoming packages as they
        arrive at the building.
      </p>
      <p>
        Your residents will receive a notification as soon as their packages are
        logged in.
      </p>
      <p>This addon can help:</p>
      <ul>
        <li>Ensure that less build-up occurs in common areas</li>
        <li>Provide a level of security over resident&apos;s belongings</li>
      </ul>
    </AddonInfoModal>
  );
});
