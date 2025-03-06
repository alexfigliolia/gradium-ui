import { Fragment, useCallback } from "react";
import type { AvailableRentableSpace } from "GraphQL/Types";
import {
  AvailableSpaceCard,
  BedsBaths,
  SpacePhotos,
} from "Pages/Leases/AvailableSpaceCard";
import { Numbers } from "Tools/Numbers";

export const AvailableSpace = ({
  beds,
  baths,
  images,
  availableSince,
  ...rest
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
      date={availableSince}
      className="available-now"
      renderChildren={(_, elapsed) => (
        <Fragment>
          {renderElapsed(elapsed)}
          <BedsBaths beds={beds} baths={baths} />
          <SpacePhotos images={images} />
        </Fragment>
      )}
      {...rest}
    />
  );
};
