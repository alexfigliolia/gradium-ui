import { memo } from "react";
import { LazyLeaseSheet } from "Layouts/Leases/LeaseSheet/LazyLeaseSheet";
import { EditLease } from "State/LeaseCRUD";
import { editing, Leases, useLeases } from "State/Leases";
import type { Propless } from "Types/React";

export const LeaseModifier = memo(
  function LeaseModifier(_: Propless) {
    const open = useLeases(editing);
    return (
      <LazyLeaseSheet
        open={open}
        model={EditLease}
        onSubmit={() => {}}
        title="Edit Lease"
        actionText="Save"
        subtitle="Modified lease terms will take place immediately. Please ensure that you've reviewed your changes"
        close={Leases.editLease.close}
      />
    );
  },
  () => true,
);
