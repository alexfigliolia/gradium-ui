import { memo, useCallback, useMemo } from "react";
import { Card } from "Components/Card";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { useLeaseProgress } from "Hooks/useLeaseProgress";
import { LeaseRemaining } from "Layouts/Leases";
import type { ILease } from "Models/Leases";
import { EditLease } from "State/LeaseCRUD";
import { Leases } from "State/Leases";
import { Dates } from "Tools/Dates";
import { Progress } from "Tools/Progress";
import "./styles.scss";

export const Lease = memo(function Lease(lease: ILease) {
  const { space, status } = lease;
  const { price, endDate, formattedStartDate, progress, pending } =
    useLeaseProgress(lease);

  const [color1, color2] = useMemo(
    () => Progress.getGradient(progress),
    [progress],
  );

  const statusLabel = useMemo(() => {
    if (pending) {
      return `Starts ${formattedStartDate}`;
    }
    if (status !== "in-progress") {
      return Leases.DISPLAY_MAP[status];
    }
    return Dates.humanDiff(new Date(), endDate);
  }, [endDate, status, formattedStartDate, pending]);

  const edit = useCallback(() => {
    EditLease.batch(lease);
    Leases.editLease.open();
  }, [lease]);

  return (
    <Card className="lease">
      <div className="title">
        <div className="space-label">
          <h4>{space.name}</h4>
          <span>{statusLabel}</span>
        </div>
        <LeaseRemaining {...lease} />
      </div>
      <div className="data">
        <span>
          <strong>Rate:</strong> ${price}
        </span>
        <span>
          <strong>Lessee:</strong> Alex Figliolia
        </span>
        <GradientBorderButton
          onClick={edit}
          style={{ "--color1": color1, "--color2": color2 }}>
          Edit Lease
        </GradientBorderButton>
      </div>
    </Card>
  );
});
