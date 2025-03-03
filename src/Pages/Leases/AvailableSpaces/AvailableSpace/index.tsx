import { Fragment, useCallback } from "react";
import type { AvailableRentableSpace } from "GraphQL/Types";
import { AvailableSpaceCard } from "Pages/Leases/AvailableSpaceCard";
import { Numbers } from "Tools/Numbers";

export const AvailableSpace = ({
  id,
  beds,
  baths,
  name,
  images,
  propertyName,
  availableSince,
}: AvailableRentableSpace) => {
  const renderElapsed = useCallback((elapsed: number) => {
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
      id={id}
      name={name}
      beds={beds}
      baths={baths}
      images={images}
      date={availableSince}
      className="available-now"
      propertyName={propertyName}
      renderChildren={(_, elapsed) => (
        <Fragment>{renderElapsed(elapsed)}</Fragment>
      )}
    />
  );
};
