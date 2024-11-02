import { memo } from "react";
import "./styles.scss";

export const SkeletonSchedule = memo(
  function SkeletonSchedule() {
    return (
      <div className="skeleton-schedule">
        {new Array(10).fill(-1).map((_, i) => {
          return <div key={i} />;
        })}
      </div>
    );
  },
  () => true,
);
