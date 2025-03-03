import { useCallback } from "react";
import type { AvailableRentableSpace } from "GraphQL/Types";
import { AvailableSpaceCard } from "Pages/Leases/AvailableSpaceCard";
import { Numbers } from "Tools/Numbers";

export const AvailableSpace = ({
  availableSince,
  ...rest
}: AvailableRentableSpace) => {
  const renderElapsed = useCallback((_: string, elapsed: number) => {
    if (elapsed === 0) {
      return (
        <p>
          Available as of <strong>today</strong>
        </p>
      );
    }
    if (elapsed === 1) {
      return (
        <p>
          Available as of <strong>yesterday</strong>
        </p>
      );
    }
    return (
      <p>
        Available for <strong>{Numbers.format(elapsed)} days</strong>
      </p>
    );
  }, []);

  return (
    <AvailableSpaceCard
      date={availableSince}
      className="available-now"
      renderChildren={renderElapsed}
      {...rest}
    />
  );
};
