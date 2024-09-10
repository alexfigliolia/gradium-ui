import { memo, useMemo } from "react";
import { ProgressTile } from "Components/ProgressTile";
import { selectMaintenance, useDashboard } from "State/Dashboard";
import type { Propless } from "Types/React";

export default memo(
  function Maintenance(_: Propless) {
    const [completion, completionRates] = useDashboard(selectMaintenance);
    const ranks = useMemo(
      () => completionRates.map(c => ({ label: c.name, value: c.rate })),
      [completionRates],
    );
    return (
      <ProgressTile
        ranks={ranks}
        title="Maintenance"
        className="maintenance"
        progress={completion}
        subtitle="Completion Rate"
        ranksTitle="Issues Per Staff Member"
      />
    );
  },
  () => true,
);
