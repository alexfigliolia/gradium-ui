import { useCallback } from "react";
import type { AvailableSoonRentableSpace } from "GraphQL/Types";
import { AvailableSpaceCard } from "Pages/Leases/AvailableSpaceCard";
import { Numbers } from "Tools/Numbers";

export const SpaceSoonToBeAvailable = ({
  availableOn,
  ...rest
}: AvailableSoonRentableSpace) => {
  const renderLabel = useCallback((_: string, elapsed: number) => {
    if (elapsed === 1) {
      return (
        <p>
          Becoming available <strong>tomorrow</strong>
        </p>
      );
    }
    return (
      <p>
        Becomes available in <strong>{Numbers.format(elapsed)} days</strong>
      </p>
    );
  }, []);

  return (
    <AvailableSpaceCard
      date={availableOn}
      className="available-soon"
      renderChildren={renderLabel}
      {...rest}
    />
  );
};
