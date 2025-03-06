import { Fragment, useCallback } from "react";
import type { AvailableSoonRentableSpace } from "GraphQL/Types";
import {
  AvailableSpaceCard,
  BedsBaths,
  SpacePhotos,
} from "Pages/Leases/AvailableSpaceCard";
import { Numbers } from "Tools/Numbers";

export const SpaceSoonToBeAvailable = ({
  beds,
  baths,
  images,
  availableOn,
  ...rest
}: AvailableSoonRentableSpace) => {
  const renderLabel = useCallback((elapsed: number) => {
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
      renderChildren={(_, elapsed) => (
        <Fragment>
          {renderLabel(elapsed)}
          <BedsBaths beds={beds} baths={baths} />
          <SpacePhotos images={images} />
        </Fragment>
      )}
      {...rest}
    />
  );
};
