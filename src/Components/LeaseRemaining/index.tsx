import type { ReactNode } from "react";
import { memo, useMemo } from "react";
import { useLeaseProgress } from "Hooks/useLeaseProgress";
import type { ILease } from "Models/Leases";
import { Progress } from "Tools/Progress";
import "./styles.scss";

export const LeaseRemaining = memo(function LeaseRemaining({
  labelFN,
  ...lease
}: Props) {
  const { status } = lease;
  const { progress, formattedEndDate } = useLeaseProgress(lease);
  const [color1, color2] = useMemo(
    () => Progress.getGradient(progress),
    [progress],
  );
  const remainingLabel = useMemo(() => {
    if (labelFN) {
      return labelFN(formattedEndDate);
    }
    if (status === "terminated") {
      return "Ended Early";
    }
    if (status === "complete") {
      return `Ended ${formattedEndDate}`;
    }
    return `Ends ${formattedEndDate}`;
  }, [status, formattedEndDate, labelFN]);
  return (
    <div className="lease-remaining">
      <div>
        <div
          style={{
            width: `${progress}%`,
            backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
            boxShadow: `0em 0.1em 0.6em ${color2}`,
          }}
        />
      </div>
      <span>{remainingLabel}</span>
    </div>
  );
});

interface Props extends ILease {
  labelFN?: (endDate: string) => ReactNode;
}
