import { memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ILeaseStatus } from "Models/Leases";
import { Dates } from "Tools/Dates";
import "./styles.scss";

export const LeaseProgress = memo(function LeaseProgress({
  end,
  start,
  status,
}: Props) {
  const endDate = useMemo(() => Dates.fromISODateString(end), [end]);
  const startDate = useMemo(() => Dates.fromISODateString(start), [start]);
  const endDisplay = useMemo(() => Dates.format(endDate), [endDate]);
  const startDisplay = useMemo(() => Dates.format(startDate), [startDate]);
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const duration = endTime - startTime;
  const elapsed = new Date().getTime() - startTime;
  const progress = parseInt(((elapsed * 100) / duration).toFixed(0));
  const barClasses = useClassNames("gradient", status);
  return (
    <div className="lease-progress">
      <div className="bar">
        <div className={barClasses} style={{ width: `${progress}%` }} />
      </div>
      <div className="dates">
        <span>{startDisplay}</span>
        <span>{endDisplay}</span>
      </div>
    </div>
  );
});

interface Props {
  end: string;
  start: string;
  status: ILeaseStatus | "unknown";
}
