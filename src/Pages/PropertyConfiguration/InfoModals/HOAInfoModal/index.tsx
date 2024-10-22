import { memo } from "react";
import {
  hoaAddonInfo,
  PropertyConfiguration,
  usePropertyConfiguration,
} from "Pages/PropertyConfiguration/State";
import type { Propless } from "Types/React";
import { AddonInfoModal } from "../AddonInfoModal";

export const HOAInfoModal = memo(function HOAInfoModal(_: Propless) {
  const open = usePropertyConfiguration(hoaAddonInfo);
  return (
    <AddonInfoModal
      open={open}
      close={PropertyConfiguration.hoaAddonInfo.close}>
      <h2>HOA Managment</h2>
      <p>
        This addon is for properties that wish to manage their Home Owner&apos;s
        Association through <span>Gradium</span>.
      </p>
      <p>Using this addon, your staff can manage:</p>
      <ul>
        <li>Setting HOA Dues for each living space</li>
        <li>Association meeting schedules</li>
      </ul>
      <p>
        while <span>Gradium</span> handles:
      </p>
      <ul>
        <li>Maintaining your ledger</li>
        <li>Tracking maintenance and expenses</li>
        <li>Creating visibility for owners</li>
      </ul>
      <p>
        In addition residents with ownership will pay their <span>HOA</span>{" "}
        dues right in the <span>Gradium</span> app. They&apos;ll also receive
        notification of upcoming meetings and have access to the full history of
        meeting agenda.
      </p>
    </AddonInfoModal>
  );
});
