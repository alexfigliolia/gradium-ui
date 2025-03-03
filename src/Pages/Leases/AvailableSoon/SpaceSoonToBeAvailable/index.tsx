import { Fragment, useCallback } from "react";
import type { AvailableSoonRentableSpace } from "GraphQL/Types";
import { useDurationElapsed } from "Hooks/useDurationElapsed";
import { AvailableSpaceCard } from "Pages/Leases/AvailableSpaceCard";
import { Numbers } from "Tools/Numbers";

export const SpaceSoonToBeAvailable = ({
  id,
  beds,
  baths,
  name,
  lease,
  images,
  propertyName,
  availableOn,
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

  const { progress, formattedEndDate, formattedStartDate } =
    useDurationElapsed(lease);

  return (
    <AvailableSpaceCard
      id={id}
      name={name}
      beds={beds}
      baths={baths}
      images={images}
      date={availableOn}
      className="available-soon"
      propertyName={propertyName}
      renderChildren={(_, elapsed) => (
        <Fragment>
          {renderLabel(elapsed)}
          {/* <div className="progress">
            <div className="bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="labels">
            <span>{formattedStartDate}</span>
            <span>{formattedEndDate}</span>
          </div> */}
        </Fragment>
      )}
    />
  );
};
