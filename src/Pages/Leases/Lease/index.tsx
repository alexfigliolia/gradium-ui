import { isBefore } from "date-fns";
import { memo, useMemo } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import type { ILease } from "Models/Leases";
import { Leases } from "State/Leases";
import { Dates } from "Tools/Dates";
import { Numbers } from "Tools/Numbers";
import { Progress } from "Tools/Progress";
import "./styles.scss";

export const Lease = memo(function Lease({
  space,
  status,
  start,
  end,
  rate,
}: ILease) {
  const eDate = useMemo(() => new Date(end), [end]);
  const sDate = useMemo(() => new Date(start), [start]);
  const pending = useMemo(() => isBefore(new Date(), sDate), [sDate]);
  const endDate = useMemo(() => Dates.format(eDate), [eDate]);
  const startDate = useMemo(() => Dates.format(sDate), [sDate]);
  const diff = useMemo(() => eDate.getTime() - sDate.getTime(), [eDate, sDate]);
  const progress = useMemo(() => {
    if (pending) {
      return 3;
    }
    return ((new Date().getTime() - sDate.getTime()) / diff) * 100;
  }, [diff, sDate, pending]);
  const [color1, color2] = useMemo(
    () => Progress.getGradient(progress),
    [progress],
  );
  const remaining = useMemo(() => {
    if (pending) {
      return `Starts ${startDate}`;
    }
    if (status !== "in-progress") {
      return Leases.DISPLAY_MAP[status];
    }
    return Dates.humanDiff(new Date(), eDate);
  }, [eDate, status, startDate, pending]);
  const remainingLabel = useMemo(() => {
    if (status === "terminated") {
      return "Ended Early";
    }
    if (status === "complete") {
      return `Ended ${endDate}`;
    }
    return `Ends ${endDate}`;
  }, [status, endDate]);
  return (
    <div className="lease">
      <div className="title">
        <div>
          <h4>{space.name}</h4>
          <span>{remaining}</span>
        </div>
        <div>
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
      </div>
      <div className="data">
        <span>
          <strong>Rate:</strong> ${Numbers.format(rate)}
        </span>
        <span>
          <strong>Lessee:</strong> Alex Figliolia
        </span>
        <GradientBorderButton
          style={{ "--color1": color1, "--color2": color2 }}>
          Edit
        </GradientBorderButton>
      </div>
    </div>
  );
});
