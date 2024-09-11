import { memo } from "react";
import { selectLeases, useLeases } from "State/Leases";
import type { Propless } from "Types/React";
import { Lease } from "./Lease";
import "./styles.scss";

export const LeaseList = memo(
  function LeaseList(_: Propless) {
    const leases = useLeases(selectLeases);
    return (
      <div className="lease-list">
        {leases.map(lease => {
          return <Lease key={lease.id} {...lease} />;
        })}
      </div>
    );
  },
  () => true,
);
