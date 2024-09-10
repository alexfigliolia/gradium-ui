import { memo, useMemo } from "react";
import { ProgressTile } from "Components/ProgressTile";
import { selectOccupancy, useDashboard } from "State/Dashboard";

export const Occupancy = memo(
  function Occupancy() {
    const [occupancy, inDemand] = useDashboard(selectOccupancy);
    const ranks = useMemo(
      () => inDemand.map(d => ({ label: d.name, value: d.occupancy })),
      [inDemand],
    );
    return (
      <ProgressTile
        ranks={ranks}
        title="Leases"
        className="occupancy"
        progress={occupancy}
        subtitle="Occupancy Rate"
        ranksTitle="Highest Demand Spaces"
      />
    );
  },
  () => true,
);
