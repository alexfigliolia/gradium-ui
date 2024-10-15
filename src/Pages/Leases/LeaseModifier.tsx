import { memo } from "react";
import { LazyLeaseSheet } from "Layouts/Leases/LeaseSheet/LazyLeaseSheet";
import { EditLease } from "State/LeaseCRUD";
import { Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";

export const LeaseModifier = memo(
  function LeaseModifier(_: Propless) {
    const open = useModals(state => state.editLease);
    return (
      <LazyLeaseSheet
        open={open}
        model={EditLease}
        onSubmit={() => {}}
        title="Edit Lease"
        actionText="Save"
        subtitle="Modified lease terms will take place immediately. Please ensure that you've reviewed your changes"
        close={Modals.editLease.close}
      />
    );
  },
  () => true,
);
