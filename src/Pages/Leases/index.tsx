import { memo } from "react";
import { GradientButton } from "Components/GradientButton";
import { Add } from "Icons/Add";
import { Search } from "Icons/Search";
import { selectLeases, useLeases } from "State/Leases";
import { Modals } from "State/Modals";
import type { Propless } from "Types/React";
import { Filters } from "./Filters";
import { Lease } from "./Lease";
import { LeaseCreator } from "./LeaseCreator";
import "./styles.scss";

export default memo(function Leases(_: Propless) {
  const leases = useLeases(selectLeases);
  return (
    <div className="leases-section">
      <div className="title">
        <h2>Current Leases</h2>
        <div>
          <GradientButton onClick={Modals.newLease.open}>
            <Add />
          </GradientButton>
          <GradientButton onClick={Modals.leaseFilters.open}>
            Search <Search />
          </GradientButton>
        </div>
      </div>
      <div className="lease-list">
        {leases.map(lease => {
          return <Lease key={lease.id} {...lease} />;
        })}
      </div>
      <Filters />
      <LeaseCreator />
    </div>
  );
});
