import { memo } from "react";
import {
  leaseAddonInfo,
  PropertyConfiguration,
  usePropertyConfiguration,
} from "Pages/PropertyConfiguration/State";
import type { Propless } from "Types/React";
import { AddonInfoModal } from "../AddonInfoModal";

export const LeaseInfoModal = memo(function LeaseInfoModal(_: Propless) {
  const open = usePropertyConfiguration(leaseAddonInfo);
  return (
    <AddonInfoModal
      open={open}
      close={PropertyConfiguration.leaseAddonInfo.close}>
      <h2>Lease Management</h2>
      <p>Leases are a fundamental part of the resident experience.</p>
      <p>
        Using the <span>Lease Managment</span> addon, your residents will be
        able to review, manage, and pay thier monthly dues entirely through{" "}
        <span>Gradium</span>.
      </p>
      <p>
        In addition, you&apos;ll be able to configure lease specifications for
        each of your living spaces.
      </p>
      <p>
        <span>Gradium</span> will generate your accounting statements and assess
        the general perforamnce of your property on the market.{" "}
        <span>Gradium</span> will factor in metrics such as:
      </p>
      <ul>
        <li>Occupancy Rates</li>
        <li>Cost of Maintenance and Upkeep</li>
        <li>Early lease terminations</li>
        <li>Lease Renewals</li>
      </ul>
      <p>
        to deliver <span>insights</span> into your business as well as tips on
        how you can <span>improve</span>.
      </p>
    </AddonInfoModal>
  );
});
