import { memo } from "react";
import { LazyLeaseSheet } from "Layouts/Leases/LeaseSheet/LazyLeaseSheet";
import { NewLease } from "State/LeaseCRUD";
import { Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";

export const LeaseCreator = memo(
  function LeaseCreator(_: Propless) {
    const open = useModals(state => state.newLease);
    return (
      <LazyLeaseSheet
        open={open}
        model={NewLease}
        onSubmit={() => {}}
        title="Create Lease"
        subtitle="Leases are your contractual obligations to a specific tenant or
          tenants"
        close={Modals.newLease.close}
      />
    );
  },
  () => true,
);
